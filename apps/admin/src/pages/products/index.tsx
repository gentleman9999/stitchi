import type { GetServerSideProps, NextPage } from 'next'
import { ProductsIndexPage } from '@components/pages'
import { withAuthenticatedUser } from '@components/hoc'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const response = await fetch('http://localhost:3001/api/auth/accessToken')

  return {
    props: {},
  }
}

const Home: NextPage = () => {
  return <ProductsIndexPage />
}

export default withAuthenticatedUser(Home)
