import {
  SsActivewearCategoryApiSchema,
  SsActivewearProductsApiSchema,
  SsActivewearStyleApiSchema,
  ssActivewearCategoriesApiSchema,
  ssActivewearProductsApiSchema,
  ssActivewearStyleApiSchema,
  ssActivewearStylesApiSchema,
} from './api-schema'
import makeClient from './client'
import { makeCategory, makeProduct, makeProductVariant } from './serializer'
import {
  SsActivewearCategory,
  SsActivewearProduct,
  SsActivewearProductVariant,
} from './types'

export interface SsActivewearSdk {
  getProduct: (filter: {
    productId: string
  }) => Promise<SsActivewearProduct | null>

  listCategories: () => Promise<SsActivewearCategory[]>
  listProducts: () => Promise<SsActivewearProduct[]>
  listProductVariants: (filter?: {
    styleId?: string
  }) => Promise<SsActivewearProductVariant[]>
}

interface MakeSdkConfig {
  client: ReturnType<typeof makeClient>
}

const makeSdk = (
  { client }: MakeSdkConfig = {
    client: makeClient(),
  },
): SsActivewearSdk => {
  return {
    listCategories: async () => {
      let categoriesResponse: SsActivewearCategoryApiSchema[] = []

      try {
        categoriesResponse = await client.call(
          '/categories',
          ssActivewearCategoriesApiSchema.required(),
        )
      } catch (error) {
        console.error('Error fetching categories', {
          context: { error },
        })
      }

      return categoriesResponse.map(makeCategory)
    },

    getProduct: async ({ productId }) => {
      let productResponse: SsActivewearStyleApiSchema | null = null

      try {
        const res = await client.call(
          `/styles/?styleid=${productId}`,
          ssActivewearStylesApiSchema.required(),
        )

        productResponse = res[0]
      } catch (error) {
        console.error('Error fetching product', {
          context: { error },
        })
      }

      return productResponse ? makeProduct(productResponse) : null
    },

    listProducts: async () => {
      let productsResponse: SsActivewearStyleApiSchema[] = []

      try {
        productsResponse = await client.call(
          '/styles',
          ssActivewearStylesApiSchema.required(),
        )
      } catch (error) {
        console.error('Error fetching products', {
          context: { error },
        })
      }

      return productsResponse.map(makeProduct)
    },

    listProductVariants: async ({ styleId } = {}) => {
      let productVariantsResponse: SsActivewearProductsApiSchema = []

      let query = ''

      if (styleId) {
        query = `?styleid=${styleId}`
      }

      try {
        productVariantsResponse = await client.call(
          `/products/${query}`,
          ssActivewearProductsApiSchema.required(),
        )
      } catch (error) {
        console.error('Error fetching ss product variants', {
          context: { error },
        })
      }

      return productVariantsResponse.map(makeProductVariant)
    },
  }
}

export default makeSdk
