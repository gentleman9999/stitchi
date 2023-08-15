import getOrThrow from '@lib/utils/get-or-throw'
import { NextRequest, NextResponse } from 'next/server'

const STITCHI_BLOG_HOST = getOrThrow(
  process.env.STITCHI_BLOG_HOST,
  'STITCHI_BLOG_HOST',
)

const NEXT_PUBLIC_SITE_URL = getOrThrow(
  process.env.NEXT_PUBLIC_SITE_URL,
  'NEXT_PUBLIC_SITE_URL',
)

export default function middleware(request: NextRequest) {
  console.log('MIDDLEWARE RUN')
  console.log('REQUEST', request)
  console.log('PATH', request.nextUrl.pathname)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-forwarded-host', NEXT_PUBLIC_SITE_URL)

  return NextResponse.rewrite(
    new URL(request.nextUrl.pathname, STITCHI_BLOG_HOST),
    {
      request: {
        headers: requestHeaders,
      },
    },
  )
}

export const config = {
  skipTrailingSlashRedirect: true,
  matcher: ['/blog/:path*'],
}
