import { gql, useQuery } from '@apollo/client'
import { ClosetLayout } from '@components/layout'
import ClosetInboxIndexPage from '@components/pages/ClosetInboxIndexPage'
import {
  ClosetInboxIndexPageGetDataQuery,
  ClosetInboxIndexPageGetDataQueryVariables,
} from '@generated/ClosetInboxIndexPageGetDataQuery'
import { notEmpty } from '@lib/utils/typescript'
import { queryTypes, useQueryState } from 'next-usequerystate'
import React from 'react'

const Page = () => {
  const [first, setFirst] = useQueryState(
    'first',
    queryTypes.integer.withDefault(10),
  )
  const [after, setAfter] = useQueryState('after', queryTypes.string)

  const { data, loading } = useQuery<
    ClosetInboxIndexPageGetDataQuery,
    ClosetInboxIndexPageGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first,
      after,
    },
  })

  const notifications =
    data?.viewer?.notifications?.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  return (
    <ClosetInboxIndexPage notifications={notifications} loading={loading} />
  )
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

const GET_DATA = gql`
  ${ClosetInboxIndexPage.fragments.notification}
  query ClosetInboxIndexPageGetDataQuery($first: Int!, $after: String) {
    viewer {
      id
      notifications(first: $first, after: $after) {
        edges {
          node {
            id
            ...ClosetInboxIndexPageNotificationFragment
          }
        }

        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

export default Page
