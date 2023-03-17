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
import { FragmentType } from '@/__generated__'

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

// return non-nullable if `fragmentType` is non-nullable
export function makeFragment<TType>(
  _documentNode: DocumentNode<TType, any>,
  fragmentType: FragmentType<DocumentNode<TType, any>>,
): TType
// return nullable if `fragmentType` is nullable
export function makeFragment<TType>(
  _documentNode: DocumentNode<TType, any>,
  fragmentType: FragmentType<DocumentNode<TType, any>> | null | undefined,
): TType | null | undefined
// return array of non-nullable if `fragmentType` is array of non-nullable
export function makeFragment<TType>(
  _documentNode: DocumentNode<TType, any>,
  fragmentType: ReadonlyArray<FragmentType<DocumentNode<TType, any>>>,
): ReadonlyArray<TType>
// return array of nullable if `fragmentType` is array of nullable
export function makeFragment<TType>(
  _documentNode: DocumentNode<TType, any>,
  fragmentType:
    | ReadonlyArray<FragmentType<DocumentNode<TType, any>>>
    | null
    | undefined,
): ReadonlyArray<TType> | null | undefined
export function makeFragment<TType>(
  _documentNode: DocumentNode<TType, any>,
  fragmentType:
    | FragmentType<DocumentNode<TType, any>>
    | ReadonlyArray<FragmentType<DocumentNode<TType, any>>>
    | null
    | undefined,
): TType | ReadonlyArray<TType> | null | undefined {
  return fragmentType as any
}

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
