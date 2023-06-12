import { gql, useQuery } from '@apollo/client'
import ClosetHomePage from '@components/pages/ClosetHomePage'
import { ClosetHomePageGetDataQuery } from '@generated/ClosetHomePageGetDataQuery'
import { withAuthentication } from '@lib/auth'
import React from 'react'
import { ClosetLayout } from '@components/layout'

const Page = () => {
  const { data } = useQuery<ClosetHomePageGetDataQuery>(GET_DATA)

  return <ClosetHomePage />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

const GET_DATA = gql`
  query ClosetHomePageGetDataQuery {
    viewer {
      id
    }
  }
`

export default withAuthentication(Page)
