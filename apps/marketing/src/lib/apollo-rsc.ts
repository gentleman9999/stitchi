import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { createApolloClient } from './apollo-new'

// Allows us to share the apollo client instance (including auth) across client and server
// To be used by react server components to instantiate the client
export const getClient = registerApolloClient(() =>
  createApolloClient(),
).getClient
