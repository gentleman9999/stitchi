import calculate from './calculateEstimate'
import calculateV2 from './calculateQuoteV2'
import * as yup from 'yup'
import {
  CatalogService,
  makeClient as makeCatalogServiceClient,
} from '../catalog'
import { logger } from '../../telemetry'

const inputSchema = yup.object().shape({
  productPriceCents: yup.number().min(0).required(),
  quantity: yup.number().min(1).required(),
  includeFulfillment: yup.boolean().required(),
  printLocations: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          colorCount: yup.number().min(1).required(),
        })
        .required(),
    )
    .required(),
})

const inputV2Schema = yup.object().shape({
  includeFulfillment: yup.boolean().required(),
  printLocations: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          colorCount: yup.number().min(1).required(),
        })
        .required(),
    )
    .required(),
  variants: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          catalogProductId: yup.string().required(),
          catalogProductVariantId: yup.string().required(),
          quantity: yup.number().min(1).required(),
        })
        .required(),
    )
    .required(),
})

type GenerateQuoteV2Input = yup.InferType<typeof inputV2Schema>

export interface QuoteServiceEstimate {
  productTotalCostCents: number
  productUnitCostCents: number
  printLocationCount: number
}

export interface QuoteServiceQuoteV2 {
  variants: {
    catalogProductId: string
    catalogProductVariantId: string
    unitCostCents: number
    unitRetailPriceCents: number
    totalRetailPriceCents: number
    quantity: number
  }[]
}

export interface QuoteService {
  generateEstimate(
    input: yup.InferType<typeof inputSchema>,
  ): Promise<QuoteServiceEstimate>

  generateQuoteV2(input: GenerateQuoteV2Input): Promise<QuoteServiceQuoteV2>
}

interface MakeClientParams {
  catalogService: CatalogService
}

type MakeClientFn = (params?: MakeClientParams) => QuoteService

const makeClient: MakeClientFn = (
  { catalogService } = {
    catalogService: makeCatalogServiceClient(),
  },
) => {
  return {
    generateEstimate: async input => {
      const validInput = await inputSchema.validate(input)

      return calculate(validInput)
    },

    generateQuoteV2: async input => {
      const validInput = await inputV2Schema.validate(input)

      let serializedVariants: (GenerateQuoteV2Input['variants'][number] & {
        priceCents: number
      })[] = []

      for (const variant of validInput.variants) {
        let productVariant

        try {
          productVariant = await catalogService.getCatalogProductVariant({
            productEntityId: variant.catalogProductId,
            variantEntityId: variant.catalogProductVariantId,
          })
        } catch (error) {
          logger
            .child({
              context: {
                error,
                productEntityId: variant.catalogProductId,
                variantEntityId: variant.catalogProductVariantId,
              },
            })
            .error(
              `Failed to get product variant: ${variant.catalogProductId}/${variant.catalogProductVariantId}`,
            )

          continue
        }

        serializedVariants.push({
          ...variant,
          priceCents: productVariant.priceCents,
        })
      }

      return calculateV2({
        includeFulfillment: validInput.includeFulfillment,
        printLocations: validInput.printLocations,
        variants: serializedVariants,
      })
    },
  }
}

export { makeClient }
