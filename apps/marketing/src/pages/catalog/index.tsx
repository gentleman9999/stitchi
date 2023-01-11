import { gql, useQuery } from '@apollo/client'
import { PrimaryLayout } from '@components/layout'
import {
  CatalogIndexPage,
  CATALOG_DEFAULT_QUERY_VARIABLES,
  CATALOG_GET_DATA,
} from '@components/pages'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/CatalogIndexPageGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@utils/get-absolute-url'
import { GetServerSideProps, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import React, { ReactElement } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { after } = query

  const client = initializeApollo()
  await client.query<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >({
    query: CATALOG_GET_DATA,
    variables: {
      ...CATALOG_DEFAULT_QUERY_VARIABLES,
      after: typeof after === 'string' ? after : undefined,
    },
  })

  return addApolloState(client, {
    props: {},
  })
}

const Catalog = () => {
  const url = makeAbsoluteUrl(routes.internal.catalog.href())
  return (
    <>
      <NextSeo
        title="Browse premium and ethical promotional products"
        description="We work with brands that you wont find anywhere else. Our team of experts is continually procuring the highest-quality, ethical, and unique products so that you can deliver experiences people love."
        canonical={url}
        openGraph={{ url }}
      />
      <CatalogIndexPage />
    </>
  )
}

Catalog.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default Catalog
