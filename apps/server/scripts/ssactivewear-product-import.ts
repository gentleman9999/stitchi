import fs from 'fs'
import csv from 'csv-parser'
import fetch, { RequestInit } from 'node-fetch'
import process from 'process'
import path from 'path'
import * as yup from 'yup'
import { getAllCategories } from './bigcommerce/get-all-categories'
import getCategoryMetafields from './bigcommerce/get-category-metafields'
import chunkArray from './chunk-array'
import { notEmpty } from '../src/utils'
// import chalk from 'chalk'

const STYLE_CSV_PATH = process.env.STYLE_CSV_PATH || null
const SKIP_UPDATE = process.env.SKIP_UPDATE === 'true'

const styleSchema = yup.object().shape({
  styleID: yup.number().required(),
  styleName: yup.string().required(),
  brandName: yup.string().required(),
  title: yup.string().required(),
  partNumber: yup.string().optional(),
  uniqueStyleName: yup.string().required(),
  description: yup.string().optional(),
  baseCategory: yup.string().optional(),
  categories: yup
    .array(yup.number().required())
    .transform(value => (value?.length ? value.split(',') : []))
    .optional(),
  brandImage: yup.string().optional(),
  styleImage: yup.string().optional(),
})

const bigCommerceProductSchema = yup.object().shape({
  id: yup.number().required(),
  custom_fields: yup
    .array(
      yup
        .object()
        .shape({
          id: yup.number().required(),
          name: yup.string().required(),
          value: yup.string().required(),
        })
        .required(),
    )
    .optional(),
})

if (!STYLE_CSV_PATH) {
  console.error('CSV_PATH environment variable is required.')
  process.exit(1)
}

// Set up the BigCommerce API details
const storeHash = 'ycjcgspsys'
const accessToken = '12hvybfwmj3u7jddg1v452q5rg3oun6'

async function parseCSV<T>(
  filePath: string,
  schema: yup.Schema<T>,
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const data: T[] = []

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async row => {
        try {
          const validDate = await schema.validate(row)
          data.push(validDate)
        } catch (error) {
          console.error('Error validating row:', error)
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed.')
        resolve(data)
      })
      .on('error', error => {
        console.error('Error reading CSV file:', error)
        reject(error)
      })

    return data
  })
}

const bigCommerceFetch = async <T>(
  url: string,
  schema: yup.Schema<T>,
  init?: RequestInit,
): Promise<T | null> => {
  const res = await fetch(
    `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog${url}`,
    {
      ...init,
      headers: {
        ...init?.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
    },
  )

  const json = await res.json()

  try {
    return schema.validate(json.data)
  } catch (error) {
    console.error('Error validating response:', { context: { error } })
    return null
  }
}

const start = async () => {
  let newProductCount = 0
  let updatedProductCount = 0
  let erroredProductCount = 0

  const styles = await parseCSV(
    path.join(__dirname, STYLE_CSV_PATH),
    styleSchema,
  )

  console.info('Successfully parsed style CSV file.')

  const bigCommerceCategories = await getAllCategories()

  console.info('Successfully fetched all big commerce categories.')

  // for each big commerce category, fetch it's metadata from big commerce API
  const chunkedCatgories = chunkArray(bigCommerceCategories, 20)
  const bigCommerceCategoryMetadata: Awaited<
    ReturnType<typeof getCategoryMetafields>
  >[] = []

  for (const chunk of chunkedCatgories) {
    const chunkMetadata = await Promise.all(
      chunk?.map(async category => {
        return getCategoryMetafields(category.id)
      }) || [],
    )

    bigCommerceCategoryMetadata.push(...chunkMetadata)
  }

  console.log('Successfully fetched all big commerce category metadata.')

  // link the metadata to the category
  const bigCommerceCategoriesWithMetadata = bigCommerceCategories?.map(
    (category, index) => {
      return {
        ...category,
        metafields: bigCommerceCategoryMetadata[index],
      }
    },
  )

  // Map<ssactivewear_category_id, bigcommerce_category_id>
  const categoriesBySSCategoryId = new Map<string, string>()

  bigCommerceCategoriesWithMetadata?.map(category => {
    const ssCategoryId = category.metafields?.find(
      metafield => metafield.key === 'ssactivewear_category_id',
    )?.value

    if (ssCategoryId) {
      categoriesBySSCategoryId.set(ssCategoryId, category.id.toString())
    }
  })

  const styleChunks = chunkArray(styles, 50)

  for (const styleChunk of styleChunks) {
    const productPromises = styleChunk.map(async style =>
      (async () => {
        try {
          // For each style, check if it exists in BigCommerce
          console.log(`Starting to import: ${style.title}.`)

          const productList = await bigCommerceFetch(
            `/products?sku=${style.uniqueStyleName}&include=custom_fields`,
            yup.array(bigCommerceProductSchema),
          )

          const product = productList?.[0]

          if (product) {
            console.info('Found existing product.')

            if (SKIP_UPDATE) {
              console.info('Skipping update.')
              console.info('--------------------')
              return
            }
          } else {
            console.info('No existing product.')
          }

          const customFieldsMap = new Map<
            string,
            { name: string; value: string }
          >(product?.custom_fields?.map(field => [field.name, field]))

          const styleIdProperty = customFieldsMap.get('style_id')

          customFieldsMap.set('style_id', {
            ...(styleIdProperty ? styleIdProperty : { name: 'style_id' }),
            value: style.styleID.toString(),
          })

          const sourceProperty = customFieldsMap.get('source')

          customFieldsMap.set('source', {
            ...(sourceProperty ? sourceProperty : { name: 'source' }),
            value: 'ss-activewear',
          })

          const bigCommerceCategoryIds = style.categories
            ?.map(category => {
              const bigCommerceCategoryId = categoriesBySSCategoryId.get(
                category.toString(),
              )

              return bigCommerceCategoryId || null
            })
            .filter(notEmpty)

          console.info(
            `Starting to ${product ? 'update' : 'create'} product...`,
          )

          const updatedProduct = await bigCommerceFetch(
            `/products${product?.id ? `/${product.id}` : ''}`,
            bigCommerceProductSchema.omit(['id']),
            {
              method: product?.id ? 'PUT' : 'POST',
              body: JSON.stringify({
                name: style.title,
                type: 'physical',
                sku: style.uniqueStyleName,
                description: style.description,
                weight: 0,
                price: 0,
                categories: bigCommerceCategoryIds,
                // Attaches or creates a new brand (fuzzy search)
                brand_name: style.brandName,
                custom_fields: Array.from(customFieldsMap.values()),
                is_visible: false,
              }),
            },
          )

          const productId = (updatedProduct as any)?.id || product?.id

          // Create thumbnail image
          if (style.styleImage && productId) {
            // Get file name without extension or directories
            const fileName = style.styleImage
              .split('/')
              .pop()
              ?.split('.')
              .shift()

            if (!fileName) {
              console.log('No file name found.')
            } else {
              // See if image already exists
              const images = await bigCommerceFetch(
                `/products/${productId}/images`,
                yup.array().of(
                  yup.object().shape({
                    image_file: yup.string().required(),
                  }),
                ),
              )

              if (
                images?.findIndex(image =>
                  image.image_file.includes(fileName),
                ) !== -1
              ) {
                console.log('Thumbnail image already exists.')
              } else {
                console.log('Creating thumbnail image...')
                await bigCommerceFetch(
                  `/products/${productId}/images`,
                  yup.object().shape({}),
                  {
                    method: 'POST',
                    body: JSON.stringify({
                      is_thumbnail: true,
                      sort_order: 1,
                      image_url: `https://store-ycjcgspsys.mybigcommerce.com/product_images/import/SS/${style.styleImage}`,
                      product_id: productId,
                    }),
                  },
                )

                console.log('Successfully created thumbnail image.')
              }
            }
          }

          if (product) {
            updatedProductCount++
          } else {
            newProductCount++
          }

          console.info(
            `Successfully ${product ? 'updated' : 'created'} product.`,
          )
          console.log('--------------------------------------')
        } catch (error) {
          erroredProductCount++
          console.error('Error importing style:', { context: { error } })
          console.log('--------------------------------------')
        }

        console.log(
          `Created: ${newProductCount} - Updated: ${updatedProductCount} - Errored: ${erroredProductCount}`,
        )
      })(),
    )

    await Promise.all(productPromises)
  }
}

start()
  .catch(e => console.error(e))
  .then(() => process.exit(0))
