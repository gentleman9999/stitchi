import { PrimaryLayout } from '@components/layout'
import { CatalogIndexPage } from '@components/pages'
import makeApi from '@lib/api'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { ReactElement } from 'react'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const api = makeApi({ ctx })

  // const { _metadata, records } = await api.product.list()

  return {
    props: {
      // records,
      // metadata: _metadata,
    },
  }
}

const Catalog = () =>
  // props: InferGetServerSidePropsType<typeof getServerSideProps>,
  {
    return <CatalogIndexPage />
  }

Catalog.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default Catalog
