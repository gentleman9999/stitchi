import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { mergeDeep } from '@apollo/client/utilities'
import getOrThrow from '@utils/get-or-throw'
import isEqual from 'lodash.isequal'
import { AppProps } from 'next/app'
import { useMemo } from 'react'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__' as const

const endpoint = getOrThrow(
  process.env.NEXT_PUBLIC_DATO_CMS_GRAPHQL_URI,
  'NEXT_PUBLIC_DATO_CMS_GRAPHQL_URI',
)

const environment = getOrThrow(
  process.env.NEXT_PUBLIC_DATO_CMS_ENV,
  'NEXT_PUBLIC_DATO_CMS_ENV',
)

const apiKey = getOrThrow(
  process.env.NEXT_PUBLIC_DATO_CMS_API_KEY,
  'NEXT_PUBLIC_DATO_CMS_API_KEY',
)

const httpLink = createHttpLink({
  uri: `${endpoint}/environments/${environment}`,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: Object.assign(headers || {}, {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    }),
  }
})

let apolloClient: ApolloClient<NormalizedCacheObject>

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
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
  pageProps: { props: P; [key: string]: any },
): { props: P & { APOLLO_STATE_PROP_NAME: any } } {
  return {
    ...pageProps,
    props: {
      ...('props' in pageProps ? pageProps.props : {}),
      [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
    } as any,
  }
}

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
