import { PrimaryLayout } from '@components/layout'
import { PartnersPage } from '@components/pages'
import React, { ReactElement } from 'react'

const Partners = () => {
  return <PartnersPage />
}

Partners.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default Partners
