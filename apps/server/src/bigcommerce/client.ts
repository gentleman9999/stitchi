import nodeFetch, { RequestInfo, RequestInit } from 'node-fetch'
import { getOrThrow } from '../utils'

const baseUrl = getOrThrow(
  process.env.BIGCOMMERCE_REST_API_URI,
  'BIGCOMMERCE_REST_API_URI',
)

const accessToken = getOrThrow(
  process.env.BIGCOMMERCE_REST_API_ACCESS_TOKEN,
  'BIGCOMMERCE_REST_API_ACCESS_TOKEN',
)

const bigCommerceClient = (url: RequestInfo, init?: RequestInit) => {
  return nodeFetch(`${baseUrl}${url}`, {
    ...init,
    headers: {
      ...init?.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': accessToken,
    },
  })
}

export default bigCommerceClient
