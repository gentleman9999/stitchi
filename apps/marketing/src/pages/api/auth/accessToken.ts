import { getAccessToken } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case 'GET': {
        const { accessToken } = await getAccessToken(req, res)

        res.status(200).json({ accessToken: accessToken || null })
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
