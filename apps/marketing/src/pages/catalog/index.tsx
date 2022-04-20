import { gql, useQuery } from '@apollo/client'
import { PrimaryLayout } from '@components/layout'
import { CatalogIndexPage } from '@components/pages'
import { defaultProductFilters } from '@components/pages/CatalogIndexPage/CatalogIndexPageProductGrid'
import { CatalogGetDataQuery } from '@generated/CatalogGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import React, { ReactElement } from 'react'

export const getStaticProps = async () => {
  const client = initializeApollo()
  await client.query<CatalogGetDataQuery>({
    query: GET_DATA,
  })

  return addApolloState(client, { props: {} })
}

const Catalog = () => {
  const { data } = useQuery<CatalogGetDataQuery>(GET_DATA, {})

  const { site } = data || {}

  return <CatalogIndexPage site={site} />
}

Catalog.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${CatalogIndexPage.fragments.site}
  query CatalogGetDataQuery {
    site {
      ...CatalogIndexPageSiteFragment
    }
  }
`

export default Catalog
