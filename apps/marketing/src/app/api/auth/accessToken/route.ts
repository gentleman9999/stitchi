import {
  AccessTokenError,
  AccessTokenErrorCode,
  getAccessToken,
} from '@auth0/nextjs-auth0'
import routes from '@lib/routes'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  try {
    const { accessToken } = await getAccessToken()

    return new Response(JSON.stringify({ accessToken }), {
      status: 200,
    })
  } catch (error) {
    if (error instanceof AccessTokenError) {
      if (error.code === AccessTokenErrorCode.MISSING_SESSION) {
        return new Response(JSON.stringify({ accessToken: null }), {
          status: 200,
        })
      }
    }

    console.error('Failed to get access token', {
      context: {
        error,
      },
    })

    return NextResponse.redirect(
      new URL(routes.internal.logout.href(), request.url),
    )
  }
}
