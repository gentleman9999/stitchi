import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  defaultDataIdFromObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { mergeDeep, relayStylePagination } from '@apollo/client/utilities'
import { AppProps } from 'next/app'
import { useMemo } from 'react'
import { isEqual } from 'lodash-es'
import { GetStaticPropsResult } from 'next'
import getOrThrow from '@/utils/get-or-throw'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__' as const

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

let apolloClient: ApolloClient<NormalizedCacheObject>

const createApolloClient = () =>
  new ApolloClient({
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

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = mergeDeep(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any[], sourceArray: any[]) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState<
  P extends Omit<{ [key: string]: any }, typeof APOLLO_STATE_PROP_NAME>,
>(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: GetStaticPropsResult<P>,
): GetStaticPropsResult<P> & { props: { APOLLO_STATE_PROP_NAME: any } } {
  return {
    ...pageProps,
    props: {
      ...('props' in pageProps ? pageProps.props : {}),
      [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
    } as any,
  }
}

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME as keyof typeof pageProps]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
