import { gql, useQuery } from '@apollo/client'
import {
  ClosetOrdersIndexPageGetDataQuery,
  ClosetOrdersIndexPageGetDataQueryVariables,
} from '@generated/ClosetOrdersIndexPageGetDataQuery'
import React from 'react'
import { notEmpty } from '@lib/utils/typescript'
import ClosetOrdersDesktopTable from './ClosetOrdersDesktopTable'
import ClosetOrdersTableFilters from './ClosetOrdersTableFilters'
import { MembershipOrdersFilterInput } from '@generated/globalTypes'
import { useDebouncedCallback } from 'use-debounce'
import { useQueryState } from 'next-usequerystate'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import routes from '@lib/routes'
import ClosetPageEmptyState from '@components/common/ClosetPageEmptyState'
import TableZeroState from '@components/ui/Table/TableZeroState'
import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetSection from '@components/common/ClosetSection'
import { TableContainer } from '@components/ui/Table'

interface Props {}

const ClosetOrdersIndexPage = (props: Props) => {
  const [filter, setFilter] = useQueryState<
    MembershipOrdersFilterInput | undefined
  >('filter', {
    defaultValue: undefined,
    serialize: value => btoa(JSON.stringify(value)),
    parse: value => JSON.parse(atob(value)),
  })

  const { data, fetchMore, refetch, variables, loading } = useQuery<
    ClosetOrdersIndexPageGetDataQuery,
    ClosetOrdersIndexPageGetDataQueryVariables
  >(GET_DATA, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const { hasOrders } = data?.viewer || {}

  const { pageInfo, edges } = data?.viewer?.orders || {}

  React.useEffect(() => {
    if (JSON.stringify(variables?.filter) === JSON.stringify(filter)) return

    refetch({ filter })
  }, [filter, refetch, variables?.filter])

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
    {
      leading: true,
    },
  )

  const orders = edges?.map(edge => edge?.node).filter(notEmpty) || []

  const tableProps = {
    orders,
    hasNextPage: pageInfo?.hasNextPage,
    onNextPage: handleNextPage,
  }

  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle
          title="Orders"
          description=""
          actions={
            <ClosetPageActions
              actions={[
                {
                  label: 'New order',
                  primary: true,
                  href: routes.internal.closet.inventory.href(),
                },
              ]}
            />
          }
        />
      </ClosetPageHeader>

      <ClosetSection>
        {!loading && !hasOrders ? (
          <ClosetPageEmptyState
            title="Start your first order"
            description="Placing an order sends your products to production."
            cta={{
              label: 'Start order',
              href: routes.internal.closet.inventory.href(),
            }}
          />
        ) : (
          <TableContainer loading={loading}>
            <ClosetOrdersTableFilters
              onChange={value => {
                const { date, ...rest } = value

                const { equality, ...dateRest } = date || {}

                handleChange({ where: { ...rest, createdAt: dateRest } })
              }}
            />

            {!orders.length ? (
              <TableZeroState />
            ) : (
              <ClosetOrdersDesktopTable {...tableProps} />
            )}
          </TableContainer>
        )}
      </ClosetSection>
    </ClosetPageContainer>
  )
}

const GET_DATA = gql`
  ${ClosetOrdersDesktopTable.fragments.order}
  query ClosetOrdersIndexPageGetDataQuery(
    $filter: MembershipOrdersFilterInput
  ) {
    viewer {
      id
      hasOrders
      orders(first: 50, filter: $filter) {
        edges {
          node {
            id
            ...ClosetOrdersDesktopTableOrderFragment
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
