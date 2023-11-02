import { NextApiRequest } from 'next'
import { IncomingMessage } from 'http'
import { SITE_URL } from './constants'

export const getAccessToken = async (ctx?: {
  req: IncomingMessage | NextApiRequest
}) => {
  let accessToken: string | null = null

  try {
    // Auth0 only provides access to the accessToken on the server.
    // So we must make a call the the Next.js server to retrieve token.
    const response = await fetch(`${SITE_URL}/api/auth/accessToken`, {
      headers: {
        cookie: ctx?.req.headers.cookie as string,
      },
    })

    const data = await response.json()

    accessToken = data.accessToken as string | null
  } catch (error) {
    console.error("Couldn't get access token", {
      context: { error },
    })
  }

  return accessToken
}
