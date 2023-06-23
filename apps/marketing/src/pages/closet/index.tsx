import { gql, useQuery } from '@apollo/client'
import ClosetHomePage from '@components/pages/ClosetHomePage'
import {
  ClosetHomePageGetDataQuery,
  ClosetHomePageGetDataQueryVariables,
} from '@generated/ClosetHomePageGetDataQuery'
import { withAuthentication } from '@lib/auth'
import React from 'react'
import { ClosetLayout } from '@components/layout'
import { notEmpty } from '@utils/typescript'

const Page = () => {
  const { data } = useQuery<
    ClosetHomePageGetDataQuery,
    ClosetHomePageGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      first: 10,
    },
  })

  const designRequests =
    data?.viewer?.designRequests.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  return <ClosetHomePage designRequests={designRequests} />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

const GET_DATA = gql`
  ${ClosetHomePage.fragments.designRequest}
  query ClosetHomePageGetDataQuery(
    $first: Int
    $after: String
    $filter: MembershipDesignRequestsFilterInput
  ) {
    viewer {
      id
      designRequests(first: $first, after: $after, filter: $filter) {
        edges {
          node {
            id
            ...ClosetHomePageDesignRequestFragment
          }
        }
      }
    }
  }
`

export default withAuthentication(Page)
