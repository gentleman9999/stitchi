import {
  createHttpLink,
  defaultDataIdFromObject,
  FieldPolicy,
  split,
  ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  getMainDefinition,
  Reference,
  relayStylePagination,
} from '@apollo/client/utilities'
import getOrThrow from '@lib/utils/get-or-throw'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__' as const

const graphqlEndpoint = getOrThrow(
  process.env.NEXT_PUBLIC_STITCHI_GRAPHQL_URI,
  'NEXT_PUBLIC_STITCHI_GRAPHQL_URI',
)

const wsEndpoint = getOrThrow(
  process.env.NEXT_PUBLIC_STITCHI_WEBSOCKET_URI,
  'NEXT_PUBLIC_STITCHI_WEBSOCKET_URI',
)

const httpLink = createHttpLink({
  uri: graphqlEndpoint,
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
})

const makeWsLink = () =>
  new GraphQLWsLink(
    createClient({
      url: wsEndpoint,
    }),
  )

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const makeSplitLink = ({ rsc = false }) =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    makeWsLink(),

    typeof window === 'undefined' && rsc === false
      ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
      : httpLink,
  )

const makeAuthLink = (
  params: { deviceId?: string; accessToken?: string } = {},
) =>
  setContext(async (_, { headers }) => {
    return {
      headers: Object.assign(headers || {}, {
        'x-device-id': params.deviceId,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: params.accessToken ? `Bearer ${params.accessToken}` : '',
      }),
    }
  })

export const createApolloClient = (
  params: { deviceId?: string; accessToken?: string; rsc?: boolean } = {},
) =>
  new NextSSRApolloClient({
    link: makeAuthLink(params).concat(makeSplitLink({ rsc: params.rsc })),
    cache: new NextSSRInMemoryCache({
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
            notifications: relayStylePagination(),
          },
        },
      },
    }),
  })

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
