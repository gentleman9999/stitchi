import nodeFetch, { RequestInfo, RequestInit } from 'node-fetch'
import { getOrThrow } from '../../utils'
import {
  makeGetCategoryResponse,
  makeGetProductResponse,
  makeGetProductVariantsResponse,
  makeListCategoriesResponse,
} from './serializer'

const API_ENDPOINT = getOrThrow(
  process.env.SCALABLE_PRESS_API_ENDPOINT_URL,
  'SCALABLE_PRESS_API_ENDPOINT_URL',
)

const API_KEY = getOrThrow(
  process.env.SCALABLE_PRESS_API_KEY,
  'SCALABLE_PRESS_API_KEY',
)

const fetch = (url: RequestInfo, init?: RequestInit | undefined) =>
  nodeFetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Basic ${Buffer.from(`:${API_KEY}`).toString('base64')}`,
    },
  })

const makeScalablePressClient = () => {
  return {
    async listCategories() {
      const res = await fetch(`${API_ENDPOINT}/v3/categories`)

      if (res.ok) {
        return makeListCategoriesResponse(await res.json())
      }

      console.error(`Failed to list categories: ${res.status}`, {
        context: { response: res },
      })
      throw new Error(`Failed to list categories: ${res.status}`)
    },
    async getCategory(categoryId: string) {
      const res = await fetch(`${API_ENDPOINT}/v3/categories/${categoryId}`)

      if (res.ok) {
        return makeGetCategoryResponse(await res.json())
      }

      console.error(`Failed to get category ${categoryId}`, {
        context: { response: res },
      })
      throw new Error(`Failed to get category ${categoryId}`)
    },
    async getProduct(productId: string) {
      const res = await fetch(`${API_ENDPOINT}/v3/products/${productId}`)
      if (res.ok) {
        return makeGetProductResponse(await res.json())
      }

      console.error(`Failed to get product ${productId}`, {
        context: { response: res },
      })
      throw new Error(`Failed to get product ${productId}`)
    },

    async getProductVariants(productId: string) {
      const res = await fetch(`${API_ENDPOINT}/v2/products/${productId}/items`)

      if (res.ok) {
        return makeGetProductVariantsResponse(productId, await res.json())
      }

      console.error(`Failed to get product variants ${productId}`, {
        context: { ...res },
      })
      throw new Error(`Failed to get product variants ${productId}`)
    },
  }
}

const sclablePress = {
  makeDefaultScalablePressClient: () => makeScalablePressClient(),
}

export default sclablePress
