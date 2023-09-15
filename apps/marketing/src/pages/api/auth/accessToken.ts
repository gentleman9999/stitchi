import { AccessTokenError, getAccessToken } from '@auth0/nextjs-auth0'
import routes from '@lib/routes'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case 'GET': {
        try {
          const { accessToken } = await getAccessToken(req, res)

          res.status(200).json({ accessToken: accessToken || null })
        } catch (error) {
          if (error instanceof AccessTokenError) {
            // If access token is invalid for whatever reason, we should log the user out to reset the session.
            res.redirect(routes.internal.logout.href())
          }
        }

        break
      }

      default:
        throw new Error(`Unsupported method: ${req.method}`)
    }
  } catch (e) {
    console.error(e)

    res.status(500).json({ message: e })
  }
}
