import routes from '@lib/routes'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.redirect(
    new URL(routes.internal.closet.designs.href(), request.url),
  )
}
