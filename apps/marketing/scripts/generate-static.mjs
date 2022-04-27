import fetch from 'node-fetch'
import {writeFile} from "fs"
import nextEnv from "@next/env"

const {loadEnvConfig} = nextEnv

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const endpoint = process.env.NEXT_PUBLIC_STITCHI_GRAPHQL_URI


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
        // Authorization: `Bearer ${apiKey}`,
      }),
      body: JSON.stringify({ variables: {}, query: staticDataQuery }),
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