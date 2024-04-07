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
import { Logger } from 'next-axiom'

const logger = new Logger()

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
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'digest' in error &&
      error.digest === 'DYNAMIC_SERVER_USAGE'
    ) {
      // We are building the app and don't have access to cookies. Do nothing.
    } else {
      logger.error(
        "Failed to get access token in RSC. This shouldn't happen.",
        { error },
      )
    }
  }

  const cookiesInstance = cookies()

  const deviceId = cookiesInstance.get(COOKIE_DEVICE_ID)?.value

  return registerApolloClient(() =>
    createApolloClient({
      deviceId,
      accessToken: accessToken || undefined,
      rsc: true,
    }),
  ).getClient()
}
