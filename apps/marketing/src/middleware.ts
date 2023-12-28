import { NextMiddleware, NextRequest, NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import { routes } from './lib'
import * as uuid from 'uuid'
import { COOKIE_DEVICE_ID } from '@lib/constants'
import staticData from '@generated/static.json'

const allBrandSlugs = staticData.brands.map(brand =>
  brand.custom_url?.url.replace(/\//g, ''),
)

const allCategorySlugs = staticData.categories.map(
  // Remove leading and trailing slashes
  category => category.custom_url.url.replace(/^\/|\/$/g, ''),
)

const addDeviceCooke = (request: NextRequest, response: NextResponse) => {
  response.cookies.set(COOKIE_DEVICE_ID, uuid.v4(), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365 * 10,
    sameSite: 'lax',
    secure: request.nextUrl.origin.startsWith('https'),
  })

  return response
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
  const response = NextResponse.next()

  const { pathname, search } = request.nextUrl

  const deviceId = request.cookies.get(COOKIE_DEVICE_ID)

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
          request.url,
        ),
      )

      return addDeviceCooke(request, redirect)
    }
  }

  // ***
  // Handle brand, product, and category rewrites
  // ***

  for (const slug of allBrandSlugs) {
    //
    // Our product catalog lives in two places, the marketing site and the app. We must handle rewrites for both cases.
    //

    // ***
    // Start: Marketing site rewrites
    // ***
    let destination: string | null = null

    const brandSlugMatcher = new RegExp(`^/${slug}$`)

    if (brandSlugMatcher.test(pathname)) {
      // /product-brand -> /catalog/brands/product-brand
      destination = `/catalog/brands/${slug}`
    }

    const productSlugMatcher = new RegExp(`^/${slug}-([a-zA-Z0-9_-]+)$`)

    if (productSlugMatcher.test(pathname)) {
      // /product-brand-product-slug -> /catalog/brands/product-brand/products/product-slug

      const rest = pathname.match(productSlugMatcher)?.[1]

      destination = `/catalog/brands/${slug}/products/${rest}`
    }

    const productSlugShareMatcher = new RegExp(
      `^/${slug}-([a-zA-Z0-9_-]+)/share$`,
    )

    if (productSlugShareMatcher.test(pathname)) {
      // /product-brand-product-slug/share -> /catalog/brands/product-brand/products/product-slug/share

      const rest = pathname.match(productSlugShareMatcher)?.[1]
      destination = `/catalog/brands/${slug}/products/${rest}/share`
    }

    // ***
    // End: Marketing site rewrites
    // ***

    // ***
    // Start: App rewrites
    // ***

    // ***
    // End: App rewrites
    // ***

    if (destination) {
      return NextResponse.rewrite(new URL(destination, request.url))
    }
  }

  for (const slug of allCategorySlugs) {
    //
    // Our product catalog lives in two places, the marketing site and the app. We must handle rewrites for both cases.
    //

    let destination: string | null = null

    // ***
    // Start: Marketing site rewrites
    // ***

    const categorySlugMatcher = new RegExp(`^/${slug}$`)

    if (categorySlugMatcher.test(pathname)) {
      // /product-category -> /catalog/categories/product-category
      destination = `/catalog/categories/${slug}`
    }

    // ***
    // End: Marketing site rewrites
    // ***

    // ***
    // Start: App rewrites
    // ***

    // ***
    // End: App rewrites
    // ***

    if (destination) {
      console.log('destination', destination)
      return NextResponse.rewrite(new URL(destination, request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - opengraph-image.* (opengraph image files)
     * - twitter-image.* (twitter image files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|opengraph-image|twitter-image).*)',
  ],
}

export default middleware
