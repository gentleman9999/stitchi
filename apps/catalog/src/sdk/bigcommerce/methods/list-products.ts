import {
  BigCommerceProductsApiSchema,
  bigCommerceApiResponseSchema,
  bigCommerceProductsApiSchema,
} from '../api-schema'
import makeClient from '../client'
import { makeProduct } from '../serializer'
import { BigCommerceProduct } from '../types'
import makeBigCommerceRepository, { BigCommerceRepository } from '../repository'

export type ListProductsFn = (
  filter?: {
    page?: number
    limit?: number
  },
  options?: {
    includeCustomFields?: boolean
    includeMetadata?: boolean
  },
) => Promise<{ products: BigCommerceProduct[]; hasNextPage: boolean }>

interface Config {
  client: ReturnType<typeof makeClient>
  bigCommerceRepository: BigCommerceRepository
}

const makeListProductsFn = (
  { client, bigCommerceRepository }: Config = {
    client: makeClient(),
    bigCommerceRepository: makeBigCommerceRepository(),
  },
): ListProductsFn => {
  return async (filter, options) => {
    let productResponse: BigCommerceProductsApiSchema = []

    const { page = 1, limit = 250 } = filter || {}

    let hasNextPage = false

    let query = `?limit=${limit}&page=${page}`

    if (options?.includeCustomFields) {
      query += '&include=custom_fields'
    }

    const [error, res] = await client.call(
      `/products${query}`,
      bigCommerceApiResponseSchema(bigCommerceProductsApiSchema.required()),
    )

    if (error) {
      console.error('Error fetching products', {
        context: { error },
      })

      throw error
    }

    productResponse = res.data

    // Need to handle an empty inventory...
    if (productResponse.length === 0) {
      return { hasNextPage: false, products: [] }
    }

    const { pagination } = res.meta || {}

    if (!pagination?.current_page || !pagination?.total_pages) {
      hasNextPage = false
    } else if (pagination.current_page >= pagination.total_pages) {
      hasNextPage = false
    } else {
      hasNextPage = true
    }

    const hydratedProductPromises = productResponse.map(async product => {
      let metadata

      if (options?.includeMetadata) {
        try {
          metadata = await bigCommerceRepository.listProductMetadata({
            productId: product.id,
          })
        } catch (error) {
          console.error('Error fetching product metadata', {
            context: { error },
          })
        }
      }

      return makeProduct({
        ...product,
        metadata: metadata || [],
      })
    })

    const products = await Promise.all(hydratedProductPromises)

    return {
      hasNextPage,
      products,
    }
  }
}

export default makeListProductsFn
