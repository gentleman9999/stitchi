import type { NextPage } from 'next'
import { ProductsIndexPage } from '@components/pages'
import { withAuthenticatedUser } from '@components/hoc'
import { MainDashboard } from '@components/layout'
import { ReactElement } from 'react'

const Home = () => {
  return <ProductsIndexPage />
}

Home.getLayout = (page: ReactElement) => <MainDashboard>{page}</MainDashboard>

export default withAuthenticatedUser(Home)
