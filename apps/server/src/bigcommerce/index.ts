import bigCommerceClient from './client'
import {
  makeProduct,
  Product,
  makeProductVariant,
  ProductVariant,
} from './serialize'

export type {
  Product as BigCommerceProduct,
  ProductVariant as BigCommerceProductVariant,
}

export interface BigCommerceClient {
  getProduct: (input: { productEntityId: number }) => Promise<Product>
  getProductVariant: (input: {
    productEntityId: number
    variantEntityId: number
  }) => Promise<ProductVariant>
}

interface BigCommerceClientConfig {}

const makeClient = (
  config: BigCommerceClientConfig = {},
): BigCommerceClient => {
  return {
    getProduct: async input => {
      try {
        const res = await bigCommerceClient(
          `/catalog/products/${input.productEntityId}`,
        )

        const { data, errors } = await res.json()

        if (errors) {
          console.error(errors)
        }

        return makeProduct(data)
      } catch (error) {
        console.error(`Failed to get product: ${input.productEntityId}`, {
          context: { error, productEntityId: input.productEntityId },
        })

        throw new Error('Failed to get product')
      }
    },
    getProductVariant: async input => {
      try {
        const res = await bigCommerceClient(
          `/catalog/products/${input.productEntityId}/variants/${input.variantEntityId}`,
        )

        const { data, errors } = await res.json()

        if (errors) {
          console.error(errors)
        }

        return makeProductVariant(data)
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
  }
}

export { makeClient }
