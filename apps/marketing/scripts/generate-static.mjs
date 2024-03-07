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
      `${process.env.BIGCOMMERCE_REST_API_URI}/catalog/categories?limit=250&is_visible=true`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': process.env.BIGCOMMERCE_REST_API_ACCESS_TOKEN,
        },
      },
    )

    const { data, meta } = await res.json()

    categories.push(...data.filter(category => category.custom_url !== null))

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
      `${process.env.BIGCOMMERCE_REST_API_URI}/catalog/brands?limit=250`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': process.env.BIGCOMMERCE_REST_API_ACCESS_TOKEN,
        },
      },
    )

    const { data, meta } = await res.json()

    brands.push(...data.filter(brand => brand.custom_url !== null))

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
    allLandingPages(first: 100) {
      id
      slug
      category
    }
  }
`

const getCmsData = async () => {
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

    return {
      designCategorySlugs:
        json.data?.allDesignCategories?.map(({ slug }) => slug) || [],
      landingPages: json.data?.allLandingPages || [],
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function fetchSeoData() {
  try {
    const { designCategorySlugs, landingPages } = await getCmsData()

    return {
      designCategorySlugs,
      landingPages,
      brands: await getBigCommerceBrands(),
      categories: await getBigCommerceCategories(),
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
