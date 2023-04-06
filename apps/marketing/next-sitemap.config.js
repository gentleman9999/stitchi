/** @type {import('next-sitemap').IConfig} */

const nextEnv = require('@next/env')
const fetch = require('node-fetch')

const { loadEnvConfig } = nextEnv

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const endpoint = process.env.NEXT_PUBLIC_STITCHI_GRAPHQL_URI

const productQuery = `
  query($after: String) {
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

const getCatalogProductSlugs = async () => {
  const paths = []
  let after = null

  const fetchData = async () => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: Object.assign({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        variables: { after: after },
        query: productQuery,
      }),
    })

    return await res.json()
  }

  let hasNextPage = true

  while (hasNextPage !== false) {
    const res = await fetchData()
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

  return paths
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stitchi.us',
  generateRobotsTxt: true,
  additionalPaths: async () => {
    const result = await getCatalogProductSlugs()

    return result.map(slug => ({
      loc: slug,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }))
  },
}
