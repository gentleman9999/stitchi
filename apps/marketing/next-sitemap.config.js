/** @type {import('next-sitemap').IConfig} */

const nextEnv = require('@next/env')
const fetch = require('node-fetch')

const { loadEnvConfig } = nextEnv

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const endpoint = process.env.NEXT_PUBLIC_STITCHI_GRAPHQL_URI

const productQuery = /* GraphQL */ `
  query ($after: String) {
    site {
      products(first: 50, after: $after) {
        edges {
          node {
            id
            path
            brand {
              id
              path
            }
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
      }
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
          if (node.path && node.brand && node.brand.path) {
            const slashRegexp = /\//g
            const serializedBrandPath = node.brand.path.replace(slashRegexp, '')
            const serializedProductPath = node.path.replace(slashRegexp, '')

            paths.push(`/${serializedBrandPath}-${serializedProductPath}`)
          }
        }
      })
      after = products.pageInfo.endCursor
      hasNextPage = products.pageInfo.hasNextPage
    }
  }

  hasNextPage = false

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

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stitchi.co',
  generateRobotsTxt: true,
  exclude: ['/learn/page/*'],
  additionalPaths: async () => {
    const productSlugs = await getCatalogProductSlugs()

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
    ]
  },
}
