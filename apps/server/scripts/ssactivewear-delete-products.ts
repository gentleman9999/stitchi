import fetch, { RequestInit } from 'node-fetch'
import * as yup from 'yup'

const storeHash = 'ycjcgspsys'
const accessToken = '12hvybfwmj3u7jddg1v452q5rg3oun6'

const bigCommerceProductSchema = yup.object().shape({
  id: yup.number().required(),
  sku: yup.string().required(),
  name: yup.string().required(),
  custom_fields: yup.array(
    yup

      .object()
      .shape({
        id: yup.number().required(),
        name: yup.string().required(),
        value: yup.string().required(),
      })
      .required(),
  ),
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
  console.log('Starting BigCommerce product delete script')

  const limit = 50
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    if (page > 1) {
      console.log('---------------------')
      console.log('LOOP')
      console.log('---------------------')
    }

    const products = await bigCommerceFetch(
      `/products?limit=${limit}&page=${page}&include=custom_fields`,
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

    // Update product variants
    for (const product of products.data) {
      const sourceField = product.custom_fields?.find(
        field => field.name === 'source',
      )

      if (sourceField && sourceField.value === 'ss-activewear') {
        console.log(`Deleting product ${product.id} - ${product.name}`)
        await bigCommerceFetch(`/products/${product.id}`, undefined, {
          method: 'DELETE',
        })
      } else {
        console.log(`Skipping product ${product.id} - ${product.name}`)
      }

      console.info('-'.repeat(50))
    }
  }

  console.info('END')
}

start()
  .catch(e => console.error(e))
  .then(() => process.exit(0))
