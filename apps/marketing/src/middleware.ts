import { NextMiddleware, NextRequest, NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import { routes } from './lib'
import * as uuid from 'uuid'
import { COOKIE_DEVICE_ID } from '@lib/constants'

const addDeviceCooke = (request: NextRequest, response: NextResponse) => {
  response.cookies.set(COOKIE_DEVICE_ID, uuid.v4(), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365 * 10,
    sameSite: 'lax',
    secure: request.nextUrl.origin.startsWith('https'),
  })
}

// const STITCHI_BLOG_URL = getOrThrow(
//   process.env.STITCHI_BLOG_URL,
//   'STITCHI_BLOG_URL',
// )

// const NEXT_PUBLIC_SITE_URL = getOrThrow(
//   process.env.NEXT_PUBLIC_SITE_URL,
//   'NEXT_PUBLIC_SITE_URL',
// )

const middleware: NextMiddleware = async (request, event) => {
  const { pathname, search, origin } = request.nextUrl

  const deviceId = request.cookies.get(COOKIE_DEVICE_ID)

  const response = NextResponse.next()

  if (!deviceId) {
    addDeviceCooke(request, response)
  }

  // if (pathname.startsWith('/blog')) {
  //   const requestHeaders = new Headers(request.headers)

  //   requestHeaders.set(
  //     'x-forwarded-for',
  //     NEXT_PUBLIC_SITE_URL.replace(/https?:\/\//, ''),
  //   )

  //   const nextUrl = new URL(STITCHI_BLOG_URL)
  //   nextUrl.pathname = pathname.replace('/blog', '')

  //   return NextResponse.rewrite(nextUrl, {
  //     request: {
  //       headers: requestHeaders,
  //     },
  //   })
  // }

  // // Remove trailing slash from Next.js URLs
  // if (pathname.length > 1 && pathname.endsWith('/')) {
  //   const nextUrl = new URL(request.nextUrl)
  //   nextUrl.pathname = nextUrl.pathname.slice(0, -1)

  //   return NextResponse.redirect(nextUrl)
  // }

  // These pages require user to be authenticated
  if (
    pathname.startsWith('/closet') ||
    pathname.startsWith('/account') ||
    pathname.startsWith('/user')
  ) {
    const session = await getSession(request, response)

    if (!session?.user) {
      let returnTo = `${pathname}${search}`

      const redirect = NextResponse.redirect(
        new URL(
          `${routes.internal.login.href({
            returnTo,
          })}`,
          request.nextUrl.origin,
        ),
      )

      return addDeviceCooke(request, redirect)
    }
  }

  return response
}

export default middleware
