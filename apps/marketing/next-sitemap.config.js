/** @type {import('next-sitemap').IConfig} */

const nextEnv = require('@next/env')
const fetch = require('node-fetch')

const { loadEnvConfig } = nextEnv

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const endpoint = process.env.NEXT_PUBLIC_STITCHI_GRAPHQL_URI

const getBigCommerceCategorySlugs = async () => {
  let page = 1
  let hasNextPage = true
  const categorySlugs = []

  while (hasNextPage) {
    const res = await fetch(
      `https://api.bigcommerce.com/stores/ycjcgspsys/v3/catalog/categories?limit=250&page=${page}&is_visible=true`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': 'o6t22c84y4aaoeaepzfqvqceiwn0luw',
        },
      },
    )

    const { data, meta } = await res.json()

    categorySlugs.push(
      ...data.map(category => category.custom_url.url.replace(/^\/|\/$/g, '')),
    )

    hasNextPage = meta.pagination.total_pages > page
    page++
  }

  return categorySlugs
}

const productQuery = /* GraphQL */ `
  query ($after: String) {
    site {
      products(first: 50, after: $after) {
        edges {
          node {
            id
            path
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

const brandQuery = /* GraphQL */ `
  query ($after: String) {
    site {
      brands(first: 50, after: $after) {
        edges {
          node {
            id
            path
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

const designCategoryQuery = /* GraphQL */ `
  query {
    allDesignCategories(first: 100) {
      id
      slug
    }
  }
`

const fetchGraphQlData = async body => {
  const res = await fetch(endpoint, {
    body,
    method: 'POST',
    headers: Object.assign({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  })

  return await res.json()
}

const getCatalogProductSlugs = async () => {
  const paths = []
  let after = null

  let hasNextPage = true

  while (hasNextPage !== false) {
    const res = await fetchGraphQlData(
      JSON.stringify({
        variables: { after: after },
        query: productQuery,
      }),
    )
    if (
      res &&
      res.data &&
      res.data.site &&
      res.data.site.products &&
      res.data.site.products.edges
    ) {
      const products = res.data.site.products
      products.edges.forEach(edge => {
        if (edge && edge.node) {
          const node = edge.node
          if (node.path) {
            const slashRegexp = /\//g
            const serializedProductPath = node.path.replace(slashRegexp, '')

            paths.push(`/${serializedProductPath}`)
          }
        }
      })
      after = products.pageInfo.endCursor
      hasNextPage = products.pageInfo.hasNextPage
    }
  }

  return paths
}

const getCatalogBrandSlugs = async () => {
  const paths = []
  let after = null
  hasNextPage = true

  while (hasNextPage !== false) {
    const res = await fetchGraphQlData(
      JSON.stringify({
        variables: { after: after },
        query: brandQuery,
      }),
    )

    if (
      res &&
      res.data &&
      res.data.site &&
      res.data.site.brands &&
      res.data.site.brands.edges
    ) {
      const brands = res.data.site.brands
      brands.edges.forEach(edge => {
        if (edge && edge.node) {
          const node = edge.node
          if (node.path) {
            const slashRegexp = /\//g
            const serializedBrandPath = node.path.replace(slashRegexp, '')

            paths.push(`/${serializedBrandPath}`)
          }
        }
      })
      after = brands.pageInfo.endCursor
      hasNextPage = brands.pageInfo.hasNextPage
    }
  }

  return paths
}

const getDesignCategorySlugs = async () => {
  const res = await fetchGraphQlData(
    JSON.stringify({
      query: designCategoryQuery,
    }),
  )

  if (
    res &&
    res.data &&
    res.data.allDesignCategories &&
    res.data.allDesignCategories
  ) {
    const categories = res.data.allDesignCategories
    return categories.map(category => `/custom-${category.slug}-shirts`)
  }

  return []
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stitchi.co',
  exclude: ['/learn/page/*'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/blog/sitemap.xml`,
    ],
    policies: [
      {
        userAgent: '*',
        disallow: ['', '/orders', '/buy', '/closet', '/account'],
      },
      { userAgent: 'Googlebot', disallow: '' },
      { userAgent: 'Googlebot-Image', disallow: '' },
      { userAgent: 'AdsBot-Google', disallow: '' },
    ],
  },
  additionalPaths: async () => {
    const productSlugs = await getCatalogProductSlugs()
    const brandSlugs = await getCatalogBrandSlugs()
    const productCategorySlugs = await getBigCommerceCategorySlugs()
    const productDesignCategorySlugs = await getDesignCategorySlugs()

    return [
      {
        loc: '/learn',
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      ...productSlugs.map(slug => ({
        loc: slug,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
      ...brandSlugs.map(slug => ({
        loc: slug,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
      ...productCategorySlugs.map(slug => ({
        loc: slug,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
      ...productDesignCategorySlugs.map(slug => ({
        loc: slug,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
    ]
  },
}
