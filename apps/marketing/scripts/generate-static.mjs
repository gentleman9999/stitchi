import fetch from 'node-fetch'
import { writeFile } from 'fs'
import nextEnv from '@next/env'

const { loadEnvConfig } = nextEnv

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const endpoint = process.env.NEXT_PUBLIC_STITCHI_GRAPHQL_URI

const getBigCommerceCategories = async () => {
  const res = await fetch(
    'https://api.bigcommerce.com/stores/ycjcgspsys/v3/catalog/categories?limit=250',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': '12hvybfwmj3u7jddg1v452q5rg3oun6',
      },
    },
  )

  return res.json()
}

const staticDataQuery = `
  query StaticDataQuery {
    site {
			brands(first: 50) {
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

async function fetchSeoData() {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: Object.assign({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({ variables: {}, query: staticDataQuery }),
    })
    const json = await result.json()

    if (json.errors) {
      throw json.errors
    }

    return {
      brands: json.data.site.brands,
      categories: (await getBigCommerceCategories()).data,
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
