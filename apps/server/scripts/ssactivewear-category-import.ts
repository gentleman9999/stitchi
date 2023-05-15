import process from 'process'
import fs from 'fs'
import * as yup from 'yup'
import csv from 'csv-parser'
import path from 'path'
import fetch, { RequestInit } from 'node-fetch'

const CATEGORY_CSV_PATH = process.env.CATEGORY_CSV_PATH || null

if (!CATEGORY_CSV_PATH) {
  console.error('CATEGORY_CSV_PATH environment variable is required')
  process.exit(1)
}

// Set up the BigCommerce API details
const storeHash = 'ycjcgspsys'
const accessToken = '12hvybfwmj3u7jddg1v452q5rg3oun6'

const categorySchema = yup.object().shape({
  categoryID: yup.number().required(),
  name: yup.string().required(),
  image: yup.string().optional(),
})

const bigCommerceCategorySchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  description: yup.string().optional(),
})

const bigCommerceCategoryMetadataSchema = yup.object().shape({
  id: yup.number().required(),
  key: yup.string(),
  value: yup.string(),
})

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
    return schema.validate(json)
  } catch (error) {
    console.error('Error validating response:', error)
    return null
  }
}

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

const start = async () => {
  const categories = await parseCSV(
    path.join(__dirname, CATEGORY_CSV_PATH),
    categorySchema,
  )

  // get all big commerce categories
  const bigCommerceCategories = await bigCommerceFetch(
    '/categories',
    yup.object().shape({
      data: yup.array().of(bigCommerceCategorySchema),
    }),
  )

  // for each big commerce category, fetch it's metadata from big commerce API
  const bigCommerceCategoryMetadata = await Promise.all(
    bigCommerceCategories?.data?.map(async category => {
      return bigCommerceFetch(
        `/categories/${category.id}/metafields`,
        yup.object().shape({
          data: yup.array().of(bigCommerceCategoryMetadataSchema),
        }),
      )
    }) || [],
  )

  // link the metadata to the category
  const bigCommerceCategoriesWithMetadata = bigCommerceCategories?.data?.map(
    (category, index) => {
      return {
        ...category,
        metafields: bigCommerceCategoryMetadata[index],
      }
    },
  )

  for (const category of categories) {
    // check if category exists in big commerce by matching ssactivewear_category_id
    const existingBigCommerceCategory = bigCommerceCategoriesWithMetadata?.find(
      bigCommerceCategory =>
        bigCommerceCategory.metafields?.data?.find(
          metafield =>
            metafield.key === 'ssactivewear_category_id' &&
            metafield.value === category.categoryID.toString(),
        ),
    )

    if (existingBigCommerceCategory) {
      console.info('Category alread exists. Skipping...')
      continue
    }

    const bigCommerceCategoryWithIdenticalName =
      bigCommerceCategoriesWithMetadata?.find(
        bigCommerceCategory => bigCommerceCategory.name === category.name,
      )

    const ssActivewearMeta = {
      key: 'ssactivewear_category_id',
      value: category.categoryID.toString(),
      permission_set: 'read',
      namespace: 'ssactivewear',
    }

    if (bigCommerceCategoryWithIdenticalName) {
      console.log('Found category, updating metadata...')
      // Update the category metadata to include the ssactivewear_category_id metafield
      const metadata = await bigCommerceFetch(
        `/categories/${bigCommerceCategoryWithIdenticalName.id}/metafields`,
        bigCommerceCategoryMetadataSchema,
        {
          method: 'POST',
          body: JSON.stringify(ssActivewearMeta),
        },
      )

      console.log(
        `Updated category ${bigCommerceCategoryWithIdenticalName.name} metadata: ${metadata}`,
      )
      continue
    }

    // create the category
    let newCategory: yup.Asserts<typeof bigCommerceCategorySchema> | null = null
    try {
      const res = await bigCommerceFetch(
        '/categories',
        yup.object().shape({
          data: bigCommerceCategorySchema.required(),
        }),
        {
          method: 'POST',
          body: JSON.stringify({
            name: category.name,
            parent_id: 0,
            is_visible: false,
          }),
        },
      )

      newCategory = res?.data || null
    } catch (error) {
      console.error('Error creating category:', { context: { error } })
      continue
    }

    if (!newCategory) {
      console.error(`Error creating category ${category.name}`)
      continue
    }

    console.info(`Created new category ${newCategory.name}`)

    // create the category metadata
    const metadata = await bigCommerceFetch(
      `/categories/${newCategory.id}/metafields`,
      yup.object().shape({
        data: bigCommerceCategoryMetadataSchema,
      }),
      {
        method: 'POST',
        body: JSON.stringify(ssActivewearMeta),
      },
    )

    console.info(
      `Created new category ${newCategory.name} with metadata ${metadata}`,
    )
  }
}

start()
  .catch(e => console.error(e))
  .then(() => process.exit())
