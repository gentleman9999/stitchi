import { PrimaryLayout } from '@components/layout'
import { CatalogIndexPage } from '@components/pages'
import makeApi from '@lib/api'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { ReactElement } from 'react'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const api = makeApi({ ctx })

  const { _metadata, records } = await api.product.list()

  return {
    props: {
      records,
      metadata: _metadata,
    },
  }
}

const Catalog = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <CatalogIndexPage
      initialProducts={
        props.records?.map(record => ({
          ...record,
          name: record.name || '',
          image: record.image,
          ratings: {
            quality: 3,
            softness: 1,
            weight: 2,
          },
        })) || []
      }
    />
  )
}

Catalog.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default Catalog
