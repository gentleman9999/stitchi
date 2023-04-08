import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  defaultDataIdFromObject,
  FieldPolicy,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { relayStylePagination, Reference } from '@apollo/client/utilities'

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
      ssrMode: typeof window === 'undefined',
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
            case 'Newsletter':
              return 'PromoPepperNewsletter'
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
          Query: {
            fields: {
              allGlossaryEntries: firstSkipPagination(),
            },
          },
          Newsletter: {
            fields: {
              allNewsletterIssues: relayStylePagination(),
            },
          },
        },
      }).restore((global as any).__APOLLO_STATE__),
    })
  }

  return client
}

type KeyArgs = FieldPolicy<any>['keyArgs']

function firstSkipPagination<T = Reference>(
  keyArgs: KeyArgs = false,
): FieldPolicy<T[]> {
  return {
    keyArgs,
    merge(existing, incoming, { args }) {
      const merged = existing ? existing.slice(0) : []

      if (incoming) {
        if (args) {
          // Assume an offset of 0 if args.offset omitted.
          const { skip = 0 } = args
          for (let i = 0; i < incoming.length; ++i) {
            merged[skip + i] = incoming[i]
          }
        } else {
          // It's unusual (probably a mistake) for a paginated field not
          // to receive any arguments, so you might prefer to throw an
          // exception here, instead of recovering by appending incoming
          // onto the existing array.
          merged.push.apply(merged, incoming as any)
        }
      }

      return merged
    },
  }
}
