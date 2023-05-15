import fetch, { RequestInit } from 'node-fetch'
import process from 'process'
import * as yup from 'yup'
import { notEmpty } from '../src/utils'

const storeHash = 'ycjcgspsys'
const accessToken = '12hvybfwmj3u7jddg1v452q5rg3oun6'

const bigCommerceProductSchema = yup.object().shape({
  id: yup.number().required(),
  sku: yup.string().required(),
  name: yup.string().required(),
})

const bigCommerceFetch = async <T>(
  url: string,
  schema?: yup.Schema<T>,
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

  if (res.status === 204) {
    return null
  }

  const json = await res.json()

  try {
    return schema ? schema.validate(json) : json
  } catch (error) {
    console.error('Error validating response:', { context: { error } })
    return null
  }
}

const start = async () => {
  // Get all big commerce products

  const limit = 50
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    const products = await bigCommerceFetch(
      `/products?limit=${limit}&page=${page}`,
      yup.object().shape({
        data: yup.array().of(bigCommerceProductSchema),
        meta: yup.object().shape({
          pagination: yup.object().shape({
            total_pages: yup.number().required(),
          }),
        }),
      }),
    )

    if (!products?.data) {
      console.error('Error fetching products from BigCommerce')
      process.exit(1)
    }

    hasNextPage = products.meta.pagination.total_pages > page
    page = page + 1

    for (const product of products.data) {
      console.info(`Checking duplicate images for product ${product.id}`)
      // Get all images for product
      const images = await bigCommerceFetch(
        `/products/${product.id}/images`,
        yup.object().shape({
          data: yup.array().of(
            yup.object().shape({
              id: yup.number().required(),
              image_file: yup.string().required(),
            }),
          ),
        }),
      )

      console.info('Successfully fetched images')

      const ogFileNames = images?.data
        ?.map(image => image.image_file.split('/').pop()?.split('__').shift())
        .filter(notEmpty)

      if (ogFileNames?.length) {
        const duplicateFileNames = new Set(
          ogFileNames.filter(
            (fileName, index) => ogFileNames.indexOf(fileName) !== index,
          ),
        )

        if (!duplicateFileNames?.size) {
          console.info('No duplicate images found. Moving on...')
          console.info('-'.repeat(50))

          continue
        }

        for (const duplicateFileName of duplicateFileNames.keys()) {
          console.log(
            `Deleting image ${duplicateFileName} for product ${product.id}`,
          )

          // Delete all deplicate images besides 1
          const [_, ...duplicatesToDelete] =
            images?.data?.filter(image =>
              image.image_file.includes(duplicateFileName),
            ) || []

          if (!duplicatesToDelete?.length) {
            console.error('Error finding duplicate images')
          } else {
            for (const duplicateImage of duplicatesToDelete) {
              await bigCommerceFetch(
                `/products/${product.id}/images/${duplicateImage.id}`,
                undefined,
                {
                  method: 'DELETE',
                },
              )
            }
          }
        }
      } else {
        console.info('No images found. Moving on...')
      }
      console.info('-'.repeat(50))
    }
  }
}

start()
  .catch(e => console.error(e))
  .then(() => process.exit(0))
