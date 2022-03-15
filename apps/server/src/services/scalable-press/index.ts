import fetch from 'node-fetch'
import { getOrThrow } from '../../utils'

const API_ENDPOINT = getOrThrow(
  process.env.SCALABLE_PRESS_API_ENDPOINT_URL,
  'SCALABLE_PRESS_API_ENDPOINT_URL',
)

const makeScalablePressClient = () => {
  return {
    async listCategories() {
      const res = await fetch(`${API_ENDPOINT}/v2/categories`)

      return res.json()
    },
    async getCategory(categoryId: string) {
      const res = await fetch(`${API_ENDPOINT}/v2/categories/${categoryId}`)
      return res.json()
    },
    async getProduct(productId: string) {
      const res = await fetch(`${API_ENDPOINT}/v2/products/${productId}`)
      return res.json()
    },
  }
}

export default {
  makeDefaultScalablePressClient: () => makeScalablePressClient(),
}
