import { AsyncExecutor } from '@graphql-tools/utils'
import { introspectSchema, wrapSchema } from '@graphql-tools/wrap'
import { print } from 'graphql'
import fetch from 'node-fetch'
import { getOrThrow } from './utils'

const CMS_API_KEY = getOrThrow(process.env.DATO_CMS_API_KEY, 'DATO_CMS_API_KEY')
const CMS_ENVIRONMENT = getOrThrow(process.env.DATO_CMS_ENV, 'DATO_CMS_ENV')
const CMS_URI = getOrThrow(
  process.env.DATO_CMS_GRAPHQL_URI,
  'DATO_CMS_GRAPHQL_URI',
)

const executor: AsyncExecutor = async ({ document, variables }) => {
  const query = print(document)
  const fetchResult = await fetch(
    `${CMS_URI}/environments/${CMS_ENVIRONMENT}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CMS_API_KEY}`,
      },
      body: JSON.stringify({ query, variables }),
    },
  )
  return fetchResult.json()
}

export const makeSchema = async () => {
  const schema = wrapSchema({
    schema: await introspectSchema(executor),
    executor,
  })
  return schema
}
