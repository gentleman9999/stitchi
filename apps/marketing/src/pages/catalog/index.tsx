import { gql, useQuery } from '@apollo/client'
import { PrimaryLayout } from '@components/layout'
import {
  CatalogIndexPage,
  CATALOG_DEFAULT_QUERY_VARIABLES,
} from '@components/pages'
import {
  CatalogGetDataQuery,
  CatalogGetDataQueryVariables,
} from '@generated/CatalogGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import React, { ReactElement } from 'react'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = initializeApollo()
  await client.query<CatalogGetDataQuery, CatalogGetDataQueryVariables>({
    query: GET_DATA,
    variables: CATALOG_DEFAULT_QUERY_VARIABLES,
  })

  return addApolloState(client, {
    props: {},
    revalidate: 60, // seconds
  })
}

const Catalog = () => {
  const { data } = useQuery<CatalogGetDataQuery, CatalogGetDataQueryVariables>(
    GET_DATA,
    { variables: CATALOG_DEFAULT_QUERY_VARIABLES },
  )

  const { site } = data || {}

  return (
    <>
      <NextSeo
        title="Browse premium and ethical promotional products"
        description="We work with brands that you wont find anywhere else. Our team of experts is continually procuring the highest-quality, ethical, and unique products so that you can deliver experiences people love."
        openGraph={{ url: routes.internal.catalog.href() }}
      />
      <CatalogIndexPage site={site} />
    </>
  )
}

Catalog.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${CatalogIndexPage.fragments.site}
  query CatalogGetDataQuery(
    $filters: SearchProductsFiltersInput!
    $first: Int!
    $after: String
  ) {
    site {
      ...CatalogIndexPageSiteFragment
    }
  }
`

export default Catalog
