import 'server-only'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { createApolloClient } from './apollo-new'
import { cookies } from 'next/headers'
import { COOKIE_DEVICE_ID } from '@lib/constants'
import {
  AccessTokenError,
  AccessTokenErrorCode,
  getAccessToken,
} from '@auth0/nextjs-auth0'

// Allows us to share the apollo client instance (including auth) across client and server
// To be used by react server components to instantiate the client
export const getClient = async () => {
  let accessToken: string | null = null

  try {
    accessToken = (await getAccessToken()).accessToken || null
  } catch (error) {
    if (
      error instanceof AccessTokenError &&
      error.code === AccessTokenErrorCode.MISSING_SESSION
    ) {
      // Do nothing
    } else {
      console.error(
        "Failed to get access token in RSC. This shouldn't happen.",
        {
          context: {
            error,
          },
        },
      )
    }
  }

  const cookiesInstance = cookies()

  const deviceId = cookiesInstance.get(COOKIE_DEVICE_ID)?.value

  return registerApolloClient(() => {
    return createApolloClient({
      accessToken: accessToken || undefined,
      deviceId,
      rsc: true,
    })
  }).getClient()
}
