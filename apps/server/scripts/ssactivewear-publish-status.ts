import fetch, { RequestInit } from 'node-fetch'
import * as yup from 'yup'

const VISIBLE = process.env.VISIBLE

if (!VISIBLE) {
  console.error('VISIBLE environment variable is required.')
  process.exit(1)
}

const visible = VISIBLE === 'true'

const storeHash = 'ycjcgspsys'
const accessToken = '12hvybfwmj3u7jddg1v452q5rg3oun6'

const bigCommerceProductSchema = yup.object().shape({
  id: yup.number().required(),
  sku: yup.string().required(),
  name: yup.string().required(),
  variants: yup.array().optional(),
  price: yup.number().optional(),
  is_visible: yup.boolean().required(),
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
  let totalProductsCount = 0
  let publishedCount = 0
  let disabledCount = 0
  let erroredCount = 0

  console.log(
    `Starting BigCommerce product ${visible ? 'publish' : 'disable'} script`,
  )

  // 250 bigC max limit
  const limit = 250
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    if (page > 1) {
      console.log('---------------------')
      console.log('LOOP')
      console.log('---------------------')
    }

    const products = await bigCommerceFetch(
      `/products?limit=${limit}&page=${page}&include=custom_fields,variants`,
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

    // create product batches of 10
    const productBatches = products.data.reduce<
      Array<Array<yup.Asserts<typeof bigCommerceProductSchema>>>
    >((acc, product, index) => {
      const batchIndex = Math.floor(index / 10)
      acc[batchIndex] = [...(acc[batchIndex] || []), product]
      return acc
    }, [])

    const productBatchUpdatePromises = productBatches.map(async batch => {
      totalProductsCount = totalProductsCount + batch.length

      try {
        const updatedProducts = await bigCommerceFetch(
          `/products`,
          yup.object().shape({
            data: yup.array().of(bigCommerceProductSchema),
          }),
          {
            method: 'PUT',
            body: JSON.stringify(
              batch.map(product => {
                const canEnableProduct =
                  Boolean(product.variants?.length) || (product.price || 0) > 0

                return {
                  ...product,
                  is_visible: visible && canEnableProduct,
                }
              }),
            ),
          },
        )

        const [disabled, enabled] = updatedProducts?.data?.reduce(
          (acc, product) => {
            if (product.is_visible) {
              acc[1] = acc[1] + 1
            } else {
              acc[0] = acc[0] + 1
            }
            return acc
          },
          [0, 0],
        ) || [0, 0]

        publishedCount = publishedCount + enabled
        disabledCount = disabledCount + disabled
      } catch (error) {
        erroredCount = erroredCount + batch.length
        console.error('Error updating products:', { context: { error } })
      } finally {
        console.log(
          `Total: ${totalProductsCount} | Published: ${publishedCount} | Disabled: ${disabledCount} | Errored: ${erroredCount}`,
        )
      }
    })

    await Promise.all(productBatchUpdatePromises)
  }

  console.info('END')
}

start()
  .catch(e => console.error(e))
  .then(() => process.exit(0))
