import React from 'react'
import { gql } from '@apollo/client'
import { getClient } from '@lib/apollo-rsc'
import {
  PrimaryLayoutGetDataQuery,
  PrimaryLayoutGetDataQueryVariables,
} from '@generated/types'
import { Footer } from '@components/common'
import { SearchProvider } from './search-context'
import Navigation from './Navigation'

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
    <SearchProvider>
      <div className="min-h-screen">
        <Navigation categoryTree={data.site.categoryTree} />
        <main className="mb-auto relative">{children}</main>
        <Footer />
      </div>
    </SearchProvider>
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