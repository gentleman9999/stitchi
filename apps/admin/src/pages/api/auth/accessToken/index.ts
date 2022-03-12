import { getAccessToken } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['openid', 'profile', 'email'],
  })

  console.log('access Token', accessToken)

  res.status(200).json({ accessToken: accessToken || null })
}
