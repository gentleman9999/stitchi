import getServerSideData from '@components/common/Catalog/getServerSideData'
import { PrimaryLayout } from '@components/layout'
import { CatalogIndexPage } from '@components/pages'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@utils/get-absolute-url'
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
