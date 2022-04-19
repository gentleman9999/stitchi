import type { NextPage } from 'next'
import { gql } from '@apollo/client'
import { withAuthenticatedUser } from '@components/hoc'
import { MainDashboard } from '@components/layout'
import { ReactElement } from 'react'

const Home = () => {
  return <>Empty Page</>
}

const GET_DATA = gql`
  query RandomQuery {
    __typename
  }
`

Home.getLayout = (page: ReactElement) => <MainDashboard>{page}</MainDashboard>

export default withAuthenticatedUser(Home)
