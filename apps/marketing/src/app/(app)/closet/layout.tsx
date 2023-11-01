import { gql } from '@apollo/client'
import {
  ClosetBaseLayoutGetDataQuery,
  ClosetBaseLayoutGetDataQueryVariables,
} from '@generated/types'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = async (props: Props) => {
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

  return <>{props.children}</>
}

const GET_DATA = gql`
  query ClosetBaseLayoutGetDataQuery {
    viewer {
      id
    }
  }
`

export default Layout
