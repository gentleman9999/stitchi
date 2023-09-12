import { gql, useQuery } from '@apollo/client'
import useRelayPagination from '@components/hooks/useRelayPagination'
import { ClosetLayout } from '@components/layout'
import ClosetInboxIndexPage from '@components/pages/ClosetInboxIndexPage'
import {
  ClosetInboxIndexPageGetDataQuery,
  ClosetInboxIndexPageGetDataQueryVariables,
} from '@generated/ClosetInboxIndexPageGetDataQuery'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'

const Page = () => {
  const { before, after, first, last, handleNextPage, handlePreviousPage } =
    useRelayPagination({
      limit: 3,
    })

  const { data, loading } = useQuery<
    ClosetInboxIndexPageGetDataQuery,
    ClosetInboxIndexPageGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      after,
      before,
      first,
      last,
    },
  })

  const { edges, pageInfo } = data?.viewer?.notifications || {}

  const notifications = edges?.map(edge => edge?.node).filter(notEmpty) || []

  const { startCursor, endCursor, hasNextPage, hasPreviousPage } =
    pageInfo || {}

  return (
    <ClosetInboxIndexPage
      notifications={notifications}
      loading={loading}
      hasNextPage={hasNextPage || false}
      hasPreviousPage={hasPreviousPage || false}
      onNextPage={() => {
        if (endCursor) {
          handleNextPage(endCursor)
        }
      }}
      onPreviousPage={() => {
        if (startCursor) {
          handlePreviousPage(startCursor)
        }
      }}
    />
  )
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

const GET_DATA = gql`
  ${ClosetInboxIndexPage.fragments.notification}
  query ClosetInboxIndexPageGetDataQuery(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    viewer {
      id
      notifications(
        first: $first
        last: $last
        before: $before
        after: $after
      ) {
        edges {
          node {
            id
            ...ClosetInboxIndexPageNotificationFragment
          }
        }

        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
    }
  }
`

export default Page
