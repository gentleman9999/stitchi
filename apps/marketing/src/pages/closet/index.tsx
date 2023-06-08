import { gql, useQuery } from '@apollo/client'
import { ClosetHomePageGetDataQuery } from '@generated/ClosetHomePageGetDataQuery'
import { withAuthentication } from '@lib/auth'
import React from 'react'

const Page = () => {
  const { data } = useQuery<ClosetHomePageGetDataQuery>(GET_DATA)

  return <>{JSON.stringify(data)}</>
}

const GET_DATA = gql`
  query ClosetHomePageGetDataQuery {
    viewer {
      id
      organizationId
      userId
      user {
        id
        nickname
      }
    }
  }
`

export default withAuthentication(Page)
