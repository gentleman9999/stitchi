import { AsyncExecutor } from '@graphql-tools/utils'
import { introspectSchema, wrapSchema } from '@graphql-tools/wrap'
import { print } from 'graphql'
import fetch from 'node-fetch'
import { getOrThrow } from './utils'

const BIGCOMMERCE_API_TOKEN = getOrThrow(
  process.env.BIGCOMMERCE_API_TOKEN,
  'BIGCOMMERCE_API_TOKEN',
)
const BIGCOMMERCE_API_URI = getOrThrow(
  process.env.BIGCOMMERCE_API_URI,
  'BIGCOMMERCE_API_URI',
)

const executor: AsyncExecutor = async ({ document, variables }) => {
  const query = print(document)
  const fetchResult = await fetch(BIGCOMMERCE_API_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BIGCOMMERCE_API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  })
  return fetchResult.json()
}

export const makeSchema = async () => {
  const schema = wrapSchema({
    schema: await introspectSchema(executor),
    executor,
  })
  return schema
}
