import {
  catalogFactoryCatalogProduct,
  productVariantFactory,
  CatalogFactoryProductVariant,
  CatalogFactoryCatalogProduct,
  catalogFactoryBrand,
  CatalogFactoryBrand,
  CatalogFactoryCategory,
  catalogFactoryCategory,
  CatalogFactoryCatalogProductOptionValue,
  catalogFactoryCatalogProductOptionValue,
} from './factory'
import {
  BigCommerceClient,
  makeClient as makeCatalogClient,
} from '../../bigcommerce'
import { logger } from '../../telemetry'

export interface OrderClientService {
  getCatalogProduct: (
    input: {
      productEntityId: string
    },
    config?: {
      includeOptions?: boolean
    },
  ) => Promise<CatalogFactoryCatalogProduct>
  getCatalogProductVariant: (input: {
    productEntityId: string
    variantEntityId: string
  }) => Promise<CatalogFactoryProductVariant>
  listCatalogProductVariants: (input: {
    productEntityId: string
  }) => Promise<CatalogFactoryProductVariant[]>
  getBrand: (input: { brandEntityId: string }) => Promise<CatalogFactoryBrand>

  listProductCategories: (input: {
    parentId?: string
  }) => Promise<CatalogFactoryCategory[]>

  getAllProductOptionValues: (input: {
    productEntityId: string
    optionEntityId: string
  }) => Promise<CatalogFactoryCatalogProductOptionValue[]>
}

interface MakeClientParams {
  bigCommerceClient: BigCommerceClient
}

type MakeClientFn = (params?: MakeClientParams) => OrderClientService

const makeClient: MakeClientFn = (
  { bigCommerceClient } = { bigCommerceClient: makeCatalogClient() },
) => {
  return {
    getCatalogProduct: async (input, config) => {
      try {
        const product = await bigCommerceClient.getProduct(
          {
            productEntityId: parseInt(input.productEntityId),
          },
          config,
        )

        return catalogFactoryCatalogProduct({ bigCommerceProduct: product })
      } catch (error) {
        logger
          .child({
            context: { error, productEntityId: input.productEntityId },
          })
          .error(`Failed to get product: ${input.productEntityId}`)
        throw new Error('Failed to get product')
      }
    },

    listCatalogProductVariants: async input => {
      try {
        const productVariants = await bigCommerceClient.listProductVariants({
          productEntityId: parseInt(input.productEntityId),
        })

        return productVariants.map(productVariant =>
          productVariantFactory({ bigCommerceProductVariant: productVariant }),
        )
      } catch (error) {
        logger.error(
          `Failed to list product variants: ${input.productEntityId}`,
          {
            context: { error, productEntityId: input.productEntityId },
          },
        )
        throw new Error('Failed to list product variants')
      }
    },

    getCatalogProductVariant: async input => {
      try {
        const productVariant = await bigCommerceClient.getProductVariant({
          productEntityId: parseInt(input.productEntityId),
          variantEntityId: parseInt(input.variantEntityId),
        })

        return productVariantFactory({
          bigCommerceProductVariant: productVariant,
        })
      } catch (error) {
        logger
          .child({
            context: {
              error,
              productEntityId: input.productEntityId,
              variantEntityId: input.variantEntityId,
            },
          })
          .error(
            `Failed to get product variant: ${input.productEntityId}/${input.variantEntityId}`,
          )
        throw new Error('Failed to get product variant')
      }
    },
    getBrand: async input => {
      try {
        const brand = await bigCommerceClient.getBrand({
          brandEntityId: parseInt(input.brandEntityId),
        })

        return catalogFactoryBrand({ bigCommerceBrand: brand })
      } catch (error) {
        logger
          .child({
            context: { error, brandEntityId: input.brandEntityId },
          })
          .error(`Failed to get brand: ${input.brandEntityId}`)
        throw new Error('Failed to get brand')
      }
    },
    listProductCategories: async input => {
      logger
      try {
        const productCategories = await bigCommerceClient.listProductCategories(
          {
            parentId: input.parentId ? parseInt(input.parentId) : undefined,
          },
        )

        return productCategories.map(productCategory =>
          catalogFactoryCategory({ bigCommerceCategory: productCategory }),
        )
      } catch (error) {
        logger
          .child({
            context: { error },
          })
          .error(`Failed to get categories`)
        throw new Error('Failed to get categories')
      }
    },

    getAllProductOptionValues: async input => {
      try {
        const productOptionValues =
          await bigCommerceClient.getAllProductOptionValues({
            productEntityId: parseInt(input.productEntityId),
            optionEntityId: parseInt(input.optionEntityId),
          })

        return productOptionValues.map(productOptionValue =>
          catalogFactoryCatalogProductOptionValue({
            bigCommerceOptionValue: productOptionValue,
          }),
        )
      } catch (error) {
        logger
          .child({
            context: { error },
          })
          .error(`Failed to get product option values`)
        throw new Error('Failed to get product option values')
      }
    },
  }
}

export { makeClient }
