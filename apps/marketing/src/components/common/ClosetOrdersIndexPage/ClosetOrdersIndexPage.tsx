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
import ClosetOrdersTableFilters from './ClosetOrdersTableFilters/ClosetOrdersTableFilters'
import {
  MembershipOrdersFilterInput,
  MembershipOrdersWhereFilterInput,
} from '@generated/globalTypes'
import { useDebouncedCallback } from 'use-debounce'
import { useQueryState } from 'next-usequerystate'

interface Props {}

const ClosetOrdersIndexPage = (props: Props) => {
  const [filter, setFilter] = useQueryState<
    MembershipOrdersFilterInput | undefined
  >('filter', {
    defaultValue: undefined,
    serialize: value => btoa(JSON.stringify(value)),
    parse: value => JSON.parse(atob(value)),
  })

  const { data, fetchMore, refetch, variables } = useQuery<
    ClosetOrdersIndexPageGetDataQuery,
    ClosetOrdersIndexPageGetDataQueryVariables
  >(GET_DATA)

  const { pageInfo, edges } = data?.viewer?.orders || {}

  React.useEffect(() => {
    if (JSON.stringify(variables?.filter) === JSON.stringify(filter)) return

    fetchMore({ variables: { filter } })
  }, [fetchMore, filter, variables?.filter])

  const handleNextPage = async () => {
    if (!pageInfo?.hasNextPage) return

    await fetchMore({
      variables: { after: pageInfo?.endCursor },
    })
  }

  const handleChange = useDebouncedCallback(
    (newFilter: MembershipOrdersFilterInput) => {
      if (JSON.stringify(newFilter) === JSON.stringify(filter)) return
      setFilter(newFilter)
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

        <ClosetOrdersTableFilters
          onChange={value => {
            const { date, ...rest } = value

            handleChange({ where: { ...rest, createdAt: date } })
          }}
        />

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
