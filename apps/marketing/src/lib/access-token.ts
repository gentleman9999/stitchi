import { NextApiRequest } from 'next'
import { IncomingMessage } from 'http'
import makeAbsoluteUrl from './utils/get-absolute-url'
import routes from './routes'

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
    console.error("Couldn't get access token", {
      context: { error },
    })
  }

  console.log('ACCESS TOKEN', accessToken)

  return accessToken
}
