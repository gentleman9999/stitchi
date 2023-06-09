import { gql, useQuery } from '@apollo/client'
import { Container } from '@components/ui'
import {
  ClosetOrdersIndexPageGetDataQuery,
  ClosetOrdersIndexPageGetDataQueryVariables,
} from '@generated/ClosetOrdersIndexPageGetDataQuery'
import React from 'react'
import Section from '../Section'
import { notEmpty } from '@utils/typescript'
import ClosetOrdersDesktopTable from './ClosetOrdersDesktopTable'
import ClosetOrdersMobileTable from './ClosetOrdersMobileTable'
import ClosetOrdersTableFilters from './ClosetOrdersTableFilters'
import { MembershipOrdersFilterInput } from '@generated/globalTypes'
import { useDebouncedCallback } from 'use-debounce'

interface Props {}

const ClosetOrdersIndexPage = (props: Props) => {
  const { data, fetchMore, refetch } = useQuery<
    ClosetOrdersIndexPageGetDataQuery,
    ClosetOrdersIndexPageGetDataQueryVariables
  >(GET_DATA)

  const { pageInfo, edges } = data?.viewer?.orders || {}

  const handleNextPage = async () => {
    if (!pageInfo?.hasNextPage) return

    await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
    })
  }

  const handleChange = useDebouncedCallback(
    (filter: MembershipOrdersFilterInput) => {
      refetch({ filter })
    },
    1000,
  )

  const orders = edges?.map(edge => edge?.node).filter(notEmpty) || []

  const tableProps = {
    orders,
    hasNextPage: pageInfo?.hasNextPage,
    onNextPage: handleNextPage,
  }

  return (
    <>
      <Container>
        <Section gutter="md">
          <h1 className="text-4xl">Your orders</h1>
        </Section>

        <ClosetOrdersTableFilters onChange={handleChange} />

        <div className="hidden md:block">
          <ClosetOrdersDesktopTable {...tableProps} />
        </div>

        <div className="md:hidden">
          <ClosetOrdersMobileTable {...tableProps} />
        </div>
      </Container>
    </>
  )
}

const GET_DATA = gql`
  ${ClosetOrdersDesktopTable.fragments.order}
  ${ClosetOrdersMobileTable.fragments.order}
  query ClosetOrdersIndexPageGetDataQuery(
    $filter: MembershipOrdersFilterInput
  ) {
    viewer {
      id
      orders(first: 50, filter: $filter) {
        edges {
          node {
            id
            ...ClosetOrdersDesktopTableOrderFragment
            ...ClosetOrdersMobileTableOrderFragment
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

export default ClosetOrdersIndexPage
