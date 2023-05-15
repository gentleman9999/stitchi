import fetch, { RequestInit } from 'node-fetch'
import * as yup from 'yup'

const storeHash = 'ycjcgspsys'
const accessToken = '12hvybfwmj3u7jddg1v452q5rg3oun6'

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
  let totalBrandsCount = 0
  let updatedCount = 0
  let untouchedCount = 0
  let erroredCount = 0

  console.log(`Starting `)

  // 250 bigC max limit
  const limit = 50
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    // fetch all brands
    const res = await bigCommerceFetch(
      `/brands?limit=${limit}&page=${page}`,
      yup
        .object()
        .shape({
          data: yup
            .array()
            .of(
              yup
                .object()
                .shape({
                  id: yup.number().required(),
                  name: yup.string().required(),
                  custom_url: yup
                    .object()
                    .shape({
                      url: yup.string().required(),
                    })
                    .optional()
                    .nullable(),
                })
                .required(),
            )
            .required(),
          meta: yup
            .object()
            .shape({
              pagination: yup
                .object()
                .shape({
                  total_pages: yup.number().required(),
                })
                .required(),
            })
            .required(),
        })
        .required(),
    )

    hasNextPage = (res?.meta.pagination.total_pages || 0) > page
    page++

    totalBrandsCount = totalBrandsCount + (res?.data.length || 0)

    const brandPromises =
      res?.data.map(async brand => {
        if (brand.custom_url?.url) {
          console.log('Brand already has slug')
          untouchedCount++
          return
        }

        try {
          await bigCommerceFetch(
            `/brands/${brand.id}`,
            yup.object().shape({
              data: yup.object().shape({}),
            }),
            {
              method: 'PUT',
              body: JSON.stringify({
                custom_url: {
                  url: `/${brand.name
                    .toLowerCase()
                    .replace(/ /g, '-')
                    .replace(/[^a-zA-Z0-9-]/g, '')}/`,
                },
              }),
            },
          )

          updatedCount++
        } catch (error) {
          console.error(error)
          erroredCount++
        }

        console.log(
          `Total: ${totalBrandsCount} | Updated: ${updatedCount} | Untouched: ${untouchedCount} | Errored: ${erroredCount}`,
        )
      }) || []

    await Promise.all(brandPromises)
  }

  console.info('END')
}

start()
  .catch(e => console.error(e))
  .then(() => process.exit(0))
