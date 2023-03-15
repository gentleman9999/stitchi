import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  defaultDataIdFromObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { relayStylePagination } from '@apollo/client/utilities'

import getOrThrow from '@/utils/get-or-throw'

const endpoint = getOrThrow(
  process.env.NEXT_PUBLIC_GRAPHQL_URI,
  'NEXT_PUBLIC_GRAPHQL_URI',
)

const httpLink = createHttpLink({
  uri: endpoint,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: Object.assign(headers || {}, {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  }
})

let client: ApolloClient<NormalizedCacheObject> | null = null

export function initializeApollo() {
  if (!client || typeof window === 'undefined') {
    client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache({
        dataIdFromObject(responseObj) {
          switch (responseObj.__typename) {
            // By default Site has no ID. We need ID to share site access across cache
            case 'Site':
              return 'StitchiSite'
            case 'Image':
              return responseObj.urlOriginal?.toString() || false
            case 'SearchQueries':
              return 'StitchiSearchQueries'
            default:
              return defaultDataIdFromObject(responseObj)
          }
        },
        typePolicies: {
          SearchProducts: {
            fields: {
              products: relayStylePagination(),
            },
          },
        },
      }),
    })
  }

  return client
}
