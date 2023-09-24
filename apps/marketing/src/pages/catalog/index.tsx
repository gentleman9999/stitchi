import getServerSideData from '@components/common/Catalog/getServerSideData'
import { PrimaryLayout } from '@components/layout'
import CatalogLayout from '@components/layout/CatalogLayout'
import { CatalogIndexPage } from '@components/pages'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import React, { ReactElement } from 'react'

export const getStaticProps: GetServerSideProps = async ({ query }) => {
  const client = initializeApollo()

  await getServerSideData(client, {})

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
        description="Discover over 5,000 customizable promotional products. From shirts and hats to unique accessories, create your personalized style with our ethical, quality brands."
        canonical={url}
        openGraph={{ url }}
      />
      <CatalogIndexPage />
    </>
  )
}

Catalog.getLayout = (page: ReactElement) => (
  <CatalogLayout>{page}</CatalogLayout>
)

export default Catalog
