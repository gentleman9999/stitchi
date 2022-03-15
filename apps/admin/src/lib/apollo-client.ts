import { useMemo } from 'react'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GetServerSidePropsContext } from 'next'
import getOrThrow from '@utils/get-or-throw'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const makeAuthLink = (ctx?: GetServerSidePropsContext) =>
  setContext(async (_, { headers }) => {
    // Auth0 only provides access to the accessToken on the server.
    // So we must make a call the the Next.js server to retrieve token.
    const response = await fetch('/api/auth/accessToken')
    const data = await response.json()
    const { accessToken } = data

    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    }
  })

const httpLink = new HttpLink({
  uri: getOrThrow(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT_URL,
    'GRAPHQL_API_ENDPOINT_URL',
  ), // Server URL (must be absolute)
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
})

/**
 * Creates a new Apollo Client instance.
 * Determines weather the instance is for the client or for the server.
 * Initializes the cache. For more info @see https://www.apollographql.com/docs/react/caching/cache-field-behavior/
 */
function createApolloClient(ctx?: GetServerSidePropsContext) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([makeAuthLink(ctx), httpLink]),
    cache: new InMemoryCache(),
  })
}

/**
 * Initializes an Apollo Client on the server with the cached values.
 *
 * @param initialState {NormalizedCacheObject}
 */
export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
  ctx?: GetServerSidePropsContext,
) {
  const client = apolloClient ?? createApolloClient(ctx)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    client.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return client
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = client

  return client
}

/**
 * Retrieves an Apollo Client instance on the client.
 *
 * @param initialState {NormalizedCacheObject} Initial Apollo State
 */
export function useApollo(initialState?: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
