import 'server-only'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { createApolloClient } from './apollo-new'
import { cookies } from 'next/headers'
import { COOKIE_DEVICE_ID } from '@lib/constants'
import { getAccessToken } from '@auth0/nextjs-auth0'

// Allows us to share the apollo client instance (including auth) across client and server
// To be used by react server components to instantiate the client
export const getClient = async () => {
  const { accessToken } = await getAccessToken()
  const cookiesInstance = cookies()

  const deviceId = cookiesInstance.get(COOKIE_DEVICE_ID)?.value

  return registerApolloClient(() => {
    return createApolloClient({
      accessToken,
      deviceId,
      rsc: true,
    })
  }).getClient()
}
