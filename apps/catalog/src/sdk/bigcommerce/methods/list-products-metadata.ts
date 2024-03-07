import {
  bigCommerceApiResponseSchema,
  bigCommerceProductMetadatasApiSchema,
} from '../api-schema'
import makeClient from '../client'
import { makeProductMetadata } from '../serializer'
import { BigCommerceProductMetadata } from '../types'

export type ListProductsMetadataFilter = {
  metadataKey?: string
  metadataKeys?: string[]
  page: number
  limit: number
}

export type ListProductsMetadataFn = (
  filter: ListProductsMetadataFilter,
) => Promise<{
  metadata: BigCommerceProductMetadata[]
  pagination: {
    hasNextPage: boolean
  }
}>

interface Config {
  client: ReturnType<typeof makeClient>
}

const makeListProductsMetadataFn = (
  { client }: Config = { client: makeClient() },
): ListProductsMetadataFn => {
  return async function list(filter) {
    let query = `?page=${filter.page}&limit=${filter.limit}`

    if (filter.metadataKey) {
      query += `&key=${filter.metadataKey}`
    }

    if (filter.metadataKeys) {
      query += `&key:in=${filter.metadataKeys.join(',')}`
    }

    const [error, res] = await client.call(
      `/products/metafields${query}`,
      bigCommerceApiResponseSchema(
        bigCommerceProductMetadatasApiSchema.required(),
      ),
    )

    if (error) {
      console.error('Error fetching products metadata', {
        context: { error },
      })

      throw error
    }

    return {
      metadata: res.data.map(metadata => makeProductMetadata(metadata)),
      pagination: {
        hasNextPage: Boolean(
          res.meta?.pagination?.total_pages &&
            res.meta?.pagination?.current_page !==
              res.meta?.pagination?.total_pages,
        ),
      },
    }
  }
}

export default makeListProductsMetadataFn
