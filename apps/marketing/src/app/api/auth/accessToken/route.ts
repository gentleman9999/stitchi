import {
  AccessTokenError,
  AccessTokenErrorCode,
  getAccessToken,
} from '@auth0/nextjs-auth0'
import routes from '@lib/routes'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  console.log('GET ACCESS TOKEN API ROUTE')
  const request = new NextRequest(req)

  const res = NextResponse.next()

  try {
    const { accessToken } = await getAccessToken(request, res)

    console.log('SERVER ACCESS TOKEN', accessToken)

    return new Response(JSON.stringify({ accessToken }), {
      status: 200,
    })
  } catch (error) {
    console.log('ERROR', error)

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

    return NextResponse.redirect(routes.internal.logout.href())
  }
}
