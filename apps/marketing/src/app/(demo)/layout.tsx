import React from 'react'
import Navigation from './Navigation'
import { gql } from '@apollo/client'
import { getClient } from '@lib/apollo-rsc'
import {
  PrimaryLayoutGetDataQuery,
  PrimaryLayoutGetDataQueryVariables,
} from '@generated/types'

interface Props {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const client = await getClient()
  const { data } = await client.query<
    PrimaryLayoutGetDataQuery,
    PrimaryLayoutGetDataQueryVariables
  >({ query: GET_DATA })

  return (
    <div className="min-h-screen">
      <Navigation categoryTree={data.site.categoryTree} />
      <main className="mb-auto relative">{children}</main>
    </div>
  )
}

const GET_DATA = gql`
  ${Navigation.fragments.site}
  query PrimaryLayoutGetDataQuery {
    site {
      ...NavigationSiteFragment
    }
  }
`

export default Layout
