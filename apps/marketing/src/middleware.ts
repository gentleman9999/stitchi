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
  return NextResponse.rewrite(
    new URL(request.nextUrl.pathname, STITCHI_BLOG_HOST),
    {
      headers: {
        x_forwarded_host: NEXT_PUBLIC_SITE_URL,
      },
    },
  )
}

export const config = {
  matcher: ['/blog/:path*'],
}
