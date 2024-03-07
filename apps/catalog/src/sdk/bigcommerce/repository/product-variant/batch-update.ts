import * as yup from 'yup'
import type { BigCommerceProductVariant } from '../../types'
import {
  bigCommerceApiProductVariantSchema,
  bigCommerceApiResponseSchema,
} from '../../api-schema'
import { makeProductVariant } from '../../serializer'
import chunkArray from '../../../../utils/chunk-array'
import makeClient from '../../client'

interface OptionValue {
  id: number
  optionId: number
}

interface BaseInput {
  price: number | undefined
  costPrice: number
  unitWeight: number
  purchasingDisabled: boolean
  inventoryLevel: number
  gtin: string | null
}

interface UpdateInput extends BaseInput {
  id: number
}

interface CreateInput extends BaseInput {
  productId: number
  sku: string
  optionValues: OptionValue[]
}

const optionValueSchema: yup.ObjectSchema<OptionValue> = yup.object().shape({
  id: yup.number().required(),
  optionId: yup.number().required(),
})

const variantSharedSchema: yup.ObjectSchema<BaseInput> = yup.object().shape({
  price: yup.number().optional(),
  costPrice: yup.number().required(),
  unitWeight: yup.number().required(),
  purchasingDisabled: yup.boolean().required(),
  inventoryLevel: yup.number().required(),
  gtin: yup.string().required().nullable(),
})

const variantUpdateSchema: yup.ObjectSchema<UpdateInput> = yup
  .object()
  .shape({
    id: yup.number().required('id is required for existing variant'),
  })
  .concat(variantSharedSchema.required())

const variantCreateSchema: yup.ObjectSchema<CreateInput> = yup
  .object()
  .shape({
    sku: yup.string().required('sku is required for new variant'),
    productId: yup.number().required('productId is required for new variant'),
    optionValues: yup
      .array()
      .of(optionValueSchema.required())
      .required('optionValues are required for new variant'),
  })
  .concat(variantSharedSchema.required())

const inputSchema = yup.object().shape({
  productId: yup.number().required(),
  variants: yup
    .array()
    .of(
      yup.lazy(value => {
        if ('id' in value) {
          return variantUpdateSchema
        }

        return variantCreateSchema
      }),
    )
    .required(),
})

export type BatchUpdateProductVariantsInput = yup.InferType<typeof inputSchema>

export type BatchUpdateProductVariantsFn = (
  input: BatchUpdateProductVariantsInput,
) => Promise<BigCommerceProductVariant[]>

interface Config {
  client: ReturnType<typeof makeClient>
}

const makeBatchUpdateProductVariantsFn = (
  { client }: Config = {
    client: makeClient(),
  },
): BatchUpdateProductVariantsFn => {
  return async function batchUpdate(input) {
    let validInput

    try {
      validInput = await inputSchema.validate(input)
    } catch (error) {
      console.error('Error validating batch variant input', {
        context: { error },
      })

      throw error
    }

    const coppiedValidInput = { ...validInput }

    const variants = validInput.variants.map(variant => {
      const baseParams =
        'id' in variant
          ? {
              id: variant.id,
            }
          : {
              product_id: coppiedValidInput.productId,
              sku: variant.sku,
              option_values: variant.optionValues.map(optionValue => ({
                id: optionValue.id,
                option_id: optionValue.optionId,
              })),
            }

      return {
        ...baseParams,
        gtin: variant.gtin || undefined,
        price: variant.price,
        cost_price: variant.costPrice,
        weight: variant.unitWeight,
        purchasing_disabled: variant.purchasingDisabled,
        inventory_level: variant.inventoryLevel,
      }
    })

    let variantsResponse: BigCommerceProductVariant[] = []

    const chunkedVariants = chunkArray(variants, 50) // BigCommerce API has a limit of 50 variants per request

    for (const variantChunk of chunkedVariants) {
      try {
        const [error, response] = await client.call(
          `/variants`,
          bigCommerceApiResponseSchema(
            yup
              .array()
              .of(bigCommerceApiProductVariantSchema.required())
              .required(),
          ),
          {
            method: 'PUT',
            body: JSON.stringify(variantChunk),
          },
        )

        if (error) {
          throw error
        }

        variantsResponse.push(...(response.data.map(makeProductVariant) || []))
      } catch (error) {
        console.error('Error batch updating product variants', {
          context: { error },
        })

        throw error
      }
    }

    return variantsResponse
  }
}

export default makeBatchUpdateProductVariantsFn
