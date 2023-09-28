import bigCommerceClient from './client'
import {
  makeProduct,
  Product,
  makeProductVariant,
  ProductVariant,
  Brand,
  makeCategory,
  Category,
} from './serialize'
import { logger } from '../telemetry'

export type {
  Product as BigCommerceProduct,
  ProductVariant as BigCommerceProductVariant,
  Brand as BigCommerceBrand,
  Category as BigCommerceCategory,
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

  listProductCategories: (input: { parentId?: number }) => Promise<Category[]>
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
          logger.error(errors)
        }

        return makeProduct(data)
      } catch (error) {
        logger
          .child({
            context: { error, productEntityId: input.productEntityId },
          })
          .error(`Failed to get product: ${input.productEntityId}`)

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
          logger.error(errors)
        }

        return makeProductVariant(data)
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
    listProductVariants: async input => {
      let hasNextPage = true
      let nextPageLink = ''

      let variants = []

      try {
        while (hasNextPage) {
          const path = `/catalog/products/${input.productEntityId}/variants${nextPageLink}`

          const res = await bigCommerceClient(path)

          const { data, meta, errors } = await res.json()

          if (errors) {
            logger.error(errors)
          }

          variants.push(...data.map(makeProductVariant))

          if (meta.pagination.links.next) {
            logger.info(`Next page link: ${meta.pagination.links.next}`)

            nextPageLink = meta.pagination.links.next
          } else {
            hasNextPage = false
          }
        }
      } catch (error) {
        logger
          .child({
            context: { error, productEntityId: input.productEntityId },
          })
          .error(`Failed to list product variants: ${input.productEntityId}`)

        throw new Error('Failed to list product variants')
      }

      return variants
    },
    getBrand: async input => {
      try {
        const res = await bigCommerceClient(
          `/catalog/brands/${input.brandEntityId}`,
        )

        const { data, errors } = await res.json()

        if (errors) {
          logger.error(errors)
        }

        return data
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
      try {
        const params = input.parentId ? `?parent_id=${input.parentId}` : ''

        const res = await bigCommerceClient(`/catalog/categories${params}`)

        const { data, errors } = await res.json()

        if (errors) {
          logger.error(errors)
        }

        return data.map(makeCategory)
      } catch (error) {
        logger
          .child({
            context: { error },
          })
          .error(`Failed to get categories`)

        throw new Error('Failed to get categories')
      }
    },
  }
}

export { makeClient }
