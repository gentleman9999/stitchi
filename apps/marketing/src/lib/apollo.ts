import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  defaultDataIdFromObject,
  FieldPolicy,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  getMainDefinition,
  mergeDeep,
  Reference,
  relayStylePagination,
} from '@apollo/client/utilities'
import getOrThrow from '@lib/utils/get-or-throw'
import { AppProps } from 'next/app'
import { useMemo } from 'react'
import { isEqual } from 'lodash-es'
import fetch from 'node-fetch'
import { GetStaticPropsResult, GetServerSidePropsContext } from 'next'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import {
  AccessTokenError,
  AccessTokenErrorCode,
  getAccessToken,
  getSession,
} from '@auth0/nextjs-auth0'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__' as const

const appUrl = getOrThrow(
  process.env.NEXT_PUBLIC_SITE_URL,
  'NEXT_PUBLIC_SITE_URL',
)

const endpoint = getOrThrow(
  process.env.NEXT_PUBLIC_STITCHI_GRAPHQL_URI,
  'NEXT_PUBLIC_STITCHI_GRAPHQL_URI',
)

const httpLink = createHttpLink({
  uri: endpoint,
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
})

const makeWsLink = (ctx?: GetServerSidePropsContext) =>
  new GraphQLWsLink(createClient({ url: 'ws://localhost:5000/graphql' }))

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const makeSplitLink = (ctx?: GetServerSidePropsContext) =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    makeWsLink(ctx),
    httpLink,
  )

let accessToken: string | undefined

const makeAuthLink = (ctx?: GetServerSidePropsContext) =>
  setContext(async (_, { headers }) => {
    if (!accessToken) {
      try {
        if (ctx) {
          accessToken = (await getAccessToken(ctx.req, ctx.res)).accessToken
        } else {
          // Auth0 only provides access to the accessToken on the server.
          // So we must make a call the the Next.js server to retrieve token.
          const response = await fetch(`${appUrl}/api/auth/accessToken`)
          const data = await response.json()
          accessToken = data.accessToken
        }
      } catch (error) {
        if (error instanceof AccessTokenError) {
          if (error.code === AccessTokenErrorCode.MISSING_SESSION) {
            // do nothing, no user is logged in
          }
          console.warn(error)
        }
      }
    }

    return {
      headers: Object.assign(headers || {}, {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      }),
    }
  })

// Allows us to share the apollo client instance (including auth) across client and server
let apolloClient: ApolloClient<NormalizedCacheObject>

const createApolloClient = (ctx?: GetServerSidePropsContext) =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: makeAuthLink(ctx).concat(makeSplitLink(ctx)),
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
        Query: {
          fields: {
            allArticles: firstSkipPagination(['filter']),
            allDesigns: firstSkipPagination(['filter']),
          },
        },
        Membership: {
          fields: {
            orders: relayStylePagination(),
          },
        },
      },
    }),
  })

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
  ctx?: GetServerSidePropsContext,
) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx)

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
