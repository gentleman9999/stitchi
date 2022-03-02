import fetch from 'node-fetch'
import { writeFile } from 'fs'
import nextEnv from '@next/env'

const { loadEnvConfig } = nextEnv

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const endpoint = process.env.NEXT_PUBLIC_DATO_CMS_GRAPHQL_URI

const environment = process.env.NEXT_PUBLIC_DATO_CMS_ENV

const apiKey = process.env.NEXT_PUBLIC_DATO_CMS_API_KEY

const URI = `${endpoint}/environments/${environment}`

const defaultSeoQuery = `
  query SeoDefaultQuery {
    homepage {
      _seoMetaTags {
        __typename
        attributes
        content
        tag
      }
    }
    site: _site {
      faviconMetaTags {
        __typename
        attributes
        content
        tag
      }
    }
  }
`

async function fetchSeoData() {
  try {
    const result = await fetch(URI, {
      method: 'POST',
      headers: Object.assign({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      }),
      body: JSON.stringify({ variables: {}, query: defaultSeoQuery }),
    })
    const json = await result.json()

    if (json.errors) {
      throw json.errors
    }

    return json
  } catch (error) {
    return console.error(error)
  }
}

const generateGlobalSEO = async () => {
  fetchSeoData().then(seo => {
    writeFile('src/generated/global-seo.json', JSON.stringify(seo), err => {
      if (err) {
        console.error('Error writing global-seo.json', err)
      } else {
        console.log('Global SEO was successfully generated.')
      }
    })
  })
}

generateGlobalSEO()
