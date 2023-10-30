import {
  AccessTokenError,
  AccessTokenErrorCode,
  getAccessToken,
} from '@auth0/nextjs-auth0'
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
            if (error.code === AccessTokenErrorCode.MISSING_SESSION) {
              return res.status(200).json({ accessToken: null })
            }
          }

          console.error('Failed to get access token', {
            context: {
              error,
            },
          })

          res.redirect(302, routes.internal.logout.href())
        }

        break
      }

      default:
        throw new Error(`Unsupported method: ${req.method}`)
    }
  } catch (e) {
    console.error('Failed to get access token', {
      context: {
        error: e,
      },
    })

    res.status(500).json({ message: e })
  }
}
