import { gql, useQuery } from '@apollo/client'
import ClosetDesignIndexPage from '@components/pages/ClosetDesignIndexPage'
import {
  ClosetDesignIndexPageGetDataQuery,
  ClosetDesignIndexPageGetDataQueryVariables,
} from '@generated/ClosetDesignIndexPageGetDataQuery'
import { withAuthentication } from '@lib/auth'
import React from 'react'
import { ClosetLayout } from '@components/layout'
import { notEmpty } from '@utils/typescript'

const Page = () => {
  const { data } = useQuery<
    ClosetDesignIndexPageGetDataQuery,
    ClosetDesignIndexPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      first: 10,
    },
    fetchPolicy: 'cache-and-network',
  })

  const designRequests =
    data?.viewer?.designRequests.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  return <ClosetDesignIndexPage designRequests={designRequests} />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

const GET_DATA = gql`
  ${ClosetDesignIndexPage.fragments.designRequest}
  query ClosetDesignIndexPageGetDataQuery(
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
            ...ClosetDesignIndexPageDesignRequestFragment
          }
        }
      }
    }
  }
`

export default withAuthentication(Page)
