import {
  catalogFactoryCatalogProduct,
  productVariantFactory,
  CatalogFactoryProductVariant,
  CatalogFactoryCatalogProduct,
  catalogFactoryBrand,
  CatalogFactoryBrand,
} from './factory'
import {
  BigCommerceClient,
  makeClient as makeCatalogClient,
} from '../../bigcommerce'

export interface OrderClientService {
  getCatalogProduct: (input: {
    productEntityId: string
  }) => Promise<CatalogFactoryCatalogProduct>
  getCatalogProductVariant: (input: {
    productEntityId: string
    variantEntityId: string
  }) => Promise<CatalogFactoryProductVariant>
  getBrand: (input: { brandEntityId: string }) => Promise<CatalogFactoryBrand>
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
  }
}

export { makeClient }
