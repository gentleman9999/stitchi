import { PrimaryLayout } from '@components/layout'
import { CustomerMorningBrewPage } from '@components/pages'
import React, { ReactElement } from 'react'

const MorningBrewApparel = () => {
  return (
    <>
      <CustomerMorningBrewPage />
    </>
  )
}

MorningBrewApparel.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default MorningBrewApparel
