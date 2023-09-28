// import getOrThrow from '@lib/utils/get-or-throw'
import { NextMiddleware, NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import { routes } from './lib'

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
    const response = NextResponse.next()
    const session = await getSession(request, response)

    if (!session?.user) {
      let returnTo = `${pathname}${search}`

      return NextResponse.redirect(
        new URL(
          `${routes.internal.login.href({
            returnTo,
          })}`,
          request.nextUrl.origin,
        ),
      )
    }
  }
}

export const config = {
  matcher: ['/closet/:path*', '/account/:path*', '/user/:path*'],
}

export default middleware
