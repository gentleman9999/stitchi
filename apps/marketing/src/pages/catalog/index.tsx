import { gql, useQuery } from '@apollo/client'
import { PrimaryLayout } from '@components/layout'
import { CatalogIndexPage } from '@components/pages'
import { CatalogGetDataQuery } from '@generated/CatalogGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticProps } from 'next'
import React, { ReactElement } from 'react'

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo()
  await client.query<CatalogGetDataQuery>({
    query: GET_DATA,
  })

  return addApolloState(client, {
    props: {},
    revalidate: 60, // seconds
  })
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
