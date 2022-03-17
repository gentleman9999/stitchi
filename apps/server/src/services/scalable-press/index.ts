import fetch from 'node-fetch'
import { getOrThrow } from '../../utils'
import {
  makeGetCategoryResponse,
  makeGetProductResponse,
  makeListCategoriesResponse,
} from './serializer'

const API_ENDPOINT = getOrThrow(
  process.env.SCALABLE_PRESS_API_ENDPOINT_URL,
  'SCALABLE_PRESS_API_ENDPOINT_URL',
)

const makeScalablePressClient = () => {
  return {
    async listCategories() {
      const res = await fetch(`${API_ENDPOINT}/v3/categories`)

      return makeListCategoriesResponse(await res.json())
    },
    async getCategory(categoryId: string) {
      const res = await fetch(`${API_ENDPOINT}/v3/categories/${categoryId}`)
      return makeGetCategoryResponse(await res.json())
    },
    async getProduct(productId: string) {
      const res = await fetch(`${API_ENDPOINT}/v3/products/${productId}`)
      return makeGetProductResponse(await res.json())
    },
  }
}

export default {
  makeDefaultScalablePressClient: () => makeScalablePressClient(),
}
