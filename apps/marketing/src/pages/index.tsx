import React, { ReactElement } from 'react'
import { PrimaryLayout } from '@components/layout'
import { HomePage } from '@components/pages'

const Home = () => {
  return <HomePage />
}

Home.getLayout = (page: ReactElement) => (
  <PrimaryLayout navBackgroundColor="">{page}</PrimaryLayout>
)

export default Home
