import { NextApiRequest } from 'next'
import { IncomingMessage } from 'http'
import makeAbsoluteUrl from './utils/get-absolute-url'
import routes from './routes'
import { Logger } from 'next-axiom'

const logger = new Logger()

export const getAccessToken = async (ctx?: {
  req: IncomingMessage | NextApiRequest
}) => {
  let accessToken: string | null = null

  try {
    // Auth0 only provides access to the accessToken on the server.
    // So we must make a call the the Next.js server to retrieve token.
    const response = await fetch(
      makeAbsoluteUrl(routes.api.auth.accessToken.href()),
      {
        cache: 'no-store',
        headers: {
          cookie: ctx?.req.headers.cookie as string,
        },
      },
    )

    if (response.ok) {
      const data = await response.json()

      accessToken = data.accessToken as string | null
    }
  } catch (error) {
    if (
      error instanceof Error &&
      typeof error.cause === 'object' &&
      error.cause !== null &&
      'code' in error.cause &&
      error.cause.code === 'ECONNREFUSED'
    ) {
      // We are building the app and don't have access to cookies. Do nothing.
    } else {
      logger.error("Couldn't get access token", {
        error,
      })
    }
  }

  return accessToken
}
