import type { NextPage } from 'next'
import { ProductsIndexPage } from '@components/pages'
import withAuthenticatedUser from '@components/hoc/withAuthenticatedUser'

const Home: NextPage = () => {
  return <ProductsIndexPage />
}

export default withAuthenticatedUser(Home)
