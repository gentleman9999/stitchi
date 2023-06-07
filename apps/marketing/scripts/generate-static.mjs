import fetch from 'node-fetch'
import { writeFile } from 'fs'

import nextEnv from '@next/env'

const { loadEnvConfig } = nextEnv

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const getBigCommerceCategories = async () => {
  let page = 1
  let hasNextPage = true
  const categories = []

  while (hasNextPage) {
    const res = await fetch(
      'https://api.bigcommerce.com/stores/ycjcgspsys/v3/catalog/categories?limit=250&is_visible=true',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': '12hvybfwmj3u7jddg1v452q5rg3oun6',
        },
      },
    )

    const { data, meta } = await res.json()

    categories.push(...data)

    hasNextPage = meta.pagination.total_pages > page
    page++
  }

  return categories
}

const getBigCommerceBrands = async () => {
  let page = 1
  let hasNextPage = true
  const brands = []

  while (hasNextPage) {
    const res = await fetch(
      'https://api.bigcommerce.com/stores/ycjcgspsys/v3/catalog/brands?limit=250',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': '12hvybfwmj3u7jddg1v452q5rg3oun6',
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

const endpoint = process.env.NEXT_PUBLIC_STITCHI_GRAPHQL_URI

const designCategoryQuery = `
  query DesignCategoryQuery {
    allDesignCategories(first: 100) {
      id
      slug
    }
  }
`

const getDesignLibraryCategories = async () => {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: Object.assign({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ variables: {}, query: designCategoryQuery }),
    })
    const json = await result.json()

    if (json.errors) {
      throw json.errors
    }

    return json.data?.allDesignCategories?.map(({ slug }) => slug) || []
  } catch (error) {
    return console.error(error)
  }
}

async function fetchSeoData() {
  try {
    return {
      brands: await getBigCommerceBrands(),
      categories: await getBigCommerceCategories(),
      designCategorySlugs: await getDesignLibraryCategories(),
    }
  } catch (error) {
    return console.error(error)
  }
}

const generateStaticData = async () => {
  fetchSeoData().then(seo => {
    writeFile('src/generated/static.json', JSON.stringify(seo), err => {
      if (err) {
        console.error('Error writing static.json', err)
      } else {
        console.log('Static data was successfully generated.')
      }
    })
  })
}

generateStaticData()
