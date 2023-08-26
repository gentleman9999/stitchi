import {
  catalogFactoryCatalogProduct,
  productVariantFactory,
  CatalogFactoryProductVariant,
  CatalogFactoryCatalogProduct,
  catalogFactoryBrand,
  CatalogFactoryBrand,
  CatalogFactoryCategory,
  catalogFactoryCategory,
} from './factory'
import {
  BigCommerceClient,
  makeClient as makeCatalogClient,
} from '../../bigcommerce'
import { logger } from '../../telemetry'

export interface OrderClientService {
  getCatalogProduct: (input: {
    productEntityId: string
  }) => Promise<CatalogFactoryCatalogProduct>
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
}

interface MakeClientParams {
  bigCommerceClient: BigCommerceClient
}

type MakeClientFn = (params?: MakeClientParams) => OrderClientService

const makeClient: MakeClientFn = (
  { bigCommerceClient } = { bigCommerceClient: makeCatalogClient() },
) => {
  return {
    getCatalogProduct: async input => {
      try {
        const product = await bigCommerceClient.getProduct({
          productEntityId: parseInt(input.productEntityId),
        })

        return catalogFactoryCatalogProduct({ bigCommerceProduct: product })
      } catch (error) {
        console.error(`Failed to get product: ${input.productEntityId}`, {
          context: { error, productEntityId: input.productEntityId },
        })
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
        console.error(
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
        console.error(
          `Failed to get product variant: ${input.productEntityId}/${input.variantEntityId}`,
          {
            context: {
              error,
              productEntityId: input.productEntityId,
              variantEntityId: input.variantEntityId,
            },
          },
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
        console.error(`Failed to get brand: ${input.brandEntityId}`, {
          context: { error, brandEntityId: input.brandEntityId },
        })
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
        console.error(`Failed to get categories`, {
          context: { error },
        })
        throw new Error('Failed to get categories')
      }
    },
  }
}

export { makeClient }
