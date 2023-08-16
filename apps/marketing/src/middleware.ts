import getOrThrow from '@lib/utils/get-or-throw'
import { NextMiddleware, NextResponse } from 'next/server'

const STITCHI_BLOG_URL = getOrThrow(
  process.env.STITCHI_BLOG_URL,
  'STITCHI_BLOG_URL',
)

const NEXT_PUBLIC_SITE_URL = getOrThrow(
  process.env.NEXT_PUBLIC_SITE_URL,
  'NEXT_PUBLIC_SITE_URL',
)

const middleware: NextMiddleware = async request => {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/blog')) {
    const requestHeaders = new Headers(request.headers)

    requestHeaders.set(
      'x-forwarded-for',
      NEXT_PUBLIC_SITE_URL.replace(/https?:\/\//, ''),
    )

    const nextUrl = new URL(STITCHI_BLOG_URL)
    nextUrl.pathname = pathname.replace('/blog', '')

    return NextResponse.rewrite(nextUrl, {
      request: {
        headers: requestHeaders,
      },
    })
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    // // Remove trailing slash from Next.js URLs
    const nextUrl = new URL(request.nextUrl)
    nextUrl.pathname = nextUrl.pathname.slice(0, -1)

    return NextResponse.redirect(nextUrl)
  }
}

export const config = {}

export default middleware
