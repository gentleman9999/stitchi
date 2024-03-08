import 'dotenv/config'

import fetch from 'node-fetch'
import { writeFile } from 'fs'

const getBigCommerceBrands = async () => {
  let page = 1
  let hasNextPage = true
  const brands = []

  while (hasNextPage) {
    const res = await fetch(
      `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_ID}/v3/catalog/brands?limit=250`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': `${process.env.BIGCOMMERCE_REST_API_ACCESS_TOKEN}`,
        },
      },
    )

    const { data, meta } = await res.json()

    brands.push(...data)

    hasNextPage = meta.pagination.total_pages > page
    page++
  }

  return brands
}

const start = async () => {
  const brands = await getBigCommerceBrands()

  writeFile('src/generated/catalog.json', JSON.stringify({ brands }), err => {
    if (err) throw err
    console.log('Brands saved!')
  })
}

start()
