import fs from 'fs'
import util from 'util'
import path from 'path'
import chunkArray from '../../../utils/chunk-array'
import {
  BigCommerceCategoriesApiSchema,
  BigCommerceCategoryMetadatasApiSchema,
  bigCommerceApiResponseSchema,
  bigCommerceCategoriesApiSchema,
  bigCommerceCategoryMetadatasApiSchema,
} from '../api-schema'
import makeClient from '../client'
import { makeCategory } from '../serializer'
import { BigCommerceCategory } from '../types'
import makeLogger from '../../../telemetry/logger'

const CACHE_FILE_PATH = path.join(__dirname, '../cache/category-metadata.json')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

export type ListCategoriesFn = () => Promise<BigCommerceCategory[]>

interface Config {
  client: ReturnType<typeof makeClient>
  logger: ReturnType<typeof makeLogger>
}

const makeListCategoriesFn = (
  { client, logger }: Config = {
    client: makeClient(),
    logger: makeLogger(),
  },
): ListCategoriesFn => {
  return async () => {
    let partialCategories: BigCommerceCategoriesApiSchema = []

    let hasNextPage = true
    let page = 1
    let limit = 250

    while (hasNextPage) {
      const [error, res] = await client.call(
        `/categories?limit=${limit}&page=${page}`,
        bigCommerceApiResponseSchema(bigCommerceCategoriesApiSchema.required()),
      )

      if (error) {
        logger.error('Error fetching categories', {
          context: { error },
        })

        throw error
      }

      partialCategories.push(...res.data)

      const { pagination } = res.meta || {}

      if (!pagination?.current_page || !pagination?.total_pages) {
        hasNextPage = false
      } else if (pagination.current_page >= pagination.total_pages) {
        hasNextPage = false
      } else {
        page++
      }
    }

    const chunkedPartialCategories = chunkArray(partialCategories, 10)

    const categories: BigCommerceCategory[] = []

    // Attempt to read the cache file, if it doesn't exist, initialize an empty object
    let categoryMetadataCache: Record<
      string,
      BigCommerceCategoryMetadatasApiSchema
    > = {}
    try {
      const data = await readFile(CACHE_FILE_PATH, 'utf8')
      categoryMetadataCache = JSON.parse(data)
    } catch (error) {
      logger.info('Category metadata cache file not found, creating a new one.')
    }

    for (const chunk of chunkedPartialCategories) {
      const completeCategoryPromises = chunk.map(async category => {
        const cachedMetadata = categoryMetadataCache[category.id]

        if (
          cachedMetadata?.find(meta => meta.key === 'ssactivewear_category_id')
        ) {
          logger.info(`Using cached data for category ${category.id}`)
          return makeCategory(category, cachedMetadata)
        } else {
          const [error, categoryMetadataResponse] = await client.call(
            `/categories/${category.id}/metafields?limit=250&page=1`,
            bigCommerceApiResponseSchema(
              bigCommerceCategoryMetadatasApiSchema.required(),
            ),
          )

          if (error) {
            logger.error('Error fetching category metadata', {
              context: { error },
            })

            throw error
          }

          // Update cache with new category metadata
          categoryMetadataCache[category.id] = categoryMetadataResponse.data

          await writeFile(
            CACHE_FILE_PATH,
            JSON.stringify(categoryMetadataCache, null, 2),
            'utf8',
          )

          return makeCategory(category, categoryMetadataResponse.data)
        }
      })

      const completeCategories = await Promise.all(completeCategoryPromises)

      categories.push(...completeCategories)
    }

    return categories
  }
}

export default makeListCategoriesFn
