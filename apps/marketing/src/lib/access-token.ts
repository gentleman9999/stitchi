import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingMessage, ServerResponse } from 'http'
import { getAccessToken as getServerSideAccessToken } from '@auth0/nextjs-auth0'
import getOrThrow from './utils/get-or-throw'

const appUrl = getOrThrow(
  process.env.NEXT_PUBLIC_SITE_URL,
  'NEXT_PUBLIC_SITE_URL',
)

export const getAccessToken = async (ctx?: {
  req: IncomingMessage | NextApiRequest
  res: ServerResponse<IncomingMessage> | NextApiResponse<any>
}) => {
  // const logger = useLogger()

  let accessToken: string | null = null
  try {
    // if (ctx) {
    //   accessToken =
    //     (await getServerSideAccessToken(ctx.req, ctx.res)).accessToken || null
    // } else {
    // Auth0 only provides access to the accessToken on the server.
    // So we must make a call the the Next.js server to retrieve token.
    const response = await fetch(`${appUrl}/api/auth/accessToken`)
    const data = await response.json()
    accessToken = data.accessToken as string | null
    // }
  } catch (error) {
    console.error("Couldn't get access token", {
      context: { error },
    })
  }

  return accessToken
}
