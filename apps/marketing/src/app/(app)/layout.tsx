import React from 'react'
import { AppLayoutContextProvider } from './app-layout-context'
import { NotificationStandoutProvider } from './notification-standout-context'
import Topbar from './Topbar'
import {
  ClosetBaseLayoutGetDataQuery,
  ClosetBaseLayoutGetDataQueryVariables,
} from '@generated/types'
import { headers } from 'next/headers'
import { getClient } from '@lib/apollo-rsc'
import { redirect } from 'next/navigation'
import routes from '@lib/routes'
import { gql } from '@apollo/client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
}

interface Props {
  children: React.ReactNode
}
const Layout = async ({ children }: Props) => {
  const headersInstance = headers()

  const client = await getClient()

  const { data } = await client.query<
    ClosetBaseLayoutGetDataQuery,
    ClosetBaseLayoutGetDataQueryVariables
  >({
    query: GET_DATA,
  })

  if (!data.viewer) {
    redirect(
      routes.internal.account.authenticated.href({
        // Reffer will be innacurate on client-side transitions. However, we only ever expect this code to execute as RSC
        redirectUrl: headersInstance.get('referrer') || undefined,
      }),
    )
  }

  return (
    <AppLayoutContextProvider>
      <NotificationStandoutProvider>
        <div className="relative h-full">
          <Topbar />

          <main
            className={`min-h-[calc(100vh-var(--topbar-height))] mt-topbar-height relative z-0`}
          >
            {children}
          </main>
        </div>
      </NotificationStandoutProvider>
    </AppLayoutContextProvider>
  )
}

const GET_DATA = gql`
  query ClosetBaseLayoutGetDataQuery {
    viewer {
      id
    }
  }
`

export default Layout
