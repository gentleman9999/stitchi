import 'server-only'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { createApolloClient } from './apollo-new'
import { cookies } from 'next/headers'
import { COOKIE_DEVICE_ID } from '@lib/constants'

// Allows us to share the apollo client instance (including auth) across client and server
// To be used by react server components to instantiate the client
export const getClient = registerApolloClient(() => {
  const cookiesInstance = cookies()

  const deviceId = cookiesInstance.get(COOKIE_DEVICE_ID)?.value

  return createApolloClient({
    deviceId,
    rsc: true,
  })
}).getClient
