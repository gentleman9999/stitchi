import getServerSideData from '@components/common/Catalog/getServerSideData'
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
        title="Premium Customizable Promotional Products"
        description="Elevate your marketing with Stitchi's affordable, easily customizable promotional products. Shop the extensive range of over 5,000 items including comfortable apparel and innovative accessories to boost your brand presence. Enjoy straightforward personalization and exceptional value with Stitchi's promotional product catalog."
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
