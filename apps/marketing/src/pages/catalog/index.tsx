import { PrimaryLayout } from '@components/layout'
import { CatalogIndexPage } from '@components/pages'
import React, { ReactElement } from 'react'

const Catalog = () => {
  return <CatalogIndexPage />
}

Catalog.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default Catalog
