import { gql, useQuery } from '@apollo/client'
import { PrimaryLayout } from '@components/layout'
import { CatalogIndexPage } from '@components/pages'
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
  const { data } = useQuery<CatalogGetDataQuery>(GET_DATA)

  const { catalog } = data || {}

  return <CatalogIndexPage categories={catalog?.categories || []} />
}

Catalog.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${CatalogIndexPage.fragments.category}
  query CatalogGetDataQuery {
    catalog {
      id
      categories {
        id
        ...CatalogIndexPageCategoryFragment
      }
    }
  }
`

export default Catalog
