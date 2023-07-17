import bigCommerceClient from './client'
import {
  makeProduct,
  Product,
  makeProductVariant,
  ProductVariant,
  Brand,
} from './serialize'

export type {
  Product as BigCommerceProduct,
  ProductVariant as BigCommerceProductVariant,
  Brand as BigCommerceBrand,
}

export interface BigCommerceClient {
  getProduct: (input: { productEntityId: number }) => Promise<Product>
  getProductVariant: (input: {
    productEntityId: number
    variantEntityId: number
  }) => Promise<ProductVariant>
  listProductVariants: (input: {
    productEntityId: number
  }) => Promise<ProductVariant[]>
  getBrand: (input: { brandEntityId: number }) => Promise<Brand>
}

interface BigCommerceClientConfig {}

const makeClient = (
  config: BigCommerceClientConfig = {},
): BigCommerceClient => {
  return {
    getProduct: async input => {
      try {
        const res = await bigCommerceClient(
          `/catalog/products/${input.productEntityId}?include=images`,
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
    listProductVariants: async input => {
      try {
        const res = await bigCommerceClient(
          `/catalog/products/${input.productEntityId}/variants`,
        )

        const { data, errors } = await res.json()

        if (errors) {
          console.error(errors)
        }

        return data.map(makeProductVariant)
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
    getBrand: async input => {
      try {
        const res = await bigCommerceClient(
          `/catalog/brands/${input.brandEntityId}`,
        )

        const { data, errors } = await res.json()

        if (errors) {
          console.error(errors)
        }

        return data
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
