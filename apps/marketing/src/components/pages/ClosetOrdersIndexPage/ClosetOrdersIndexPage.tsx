import { gql, useQuery } from '@apollo/client'
import { Container } from '@components/ui'
import {
  ClosetOrdersIndexPageGetDataQuery,
  ClosetOrdersIndexPageGetDataQueryVariables,
} from '@generated/ClosetOrdersIndexPageGetDataQuery'
import React from 'react'
import { notEmpty } from '@lib/utils/typescript'
import ClosetOrdersDesktopTable from './ClosetOrdersDesktopTable'
import ClosetOrdersMobileTable from './ClosetOrdersMobileTable'
import ClosetOrdersTableFilters from './ClosetOrdersTableFilters'
import { MembershipOrdersFilterInput } from '@generated/globalTypes'
import { useDebouncedCallback } from 'use-debounce'
import { useQueryState } from 'next-usequerystate'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import routes from '@lib/routes'
import ClosetPageEmptyState from '@components/common/ClosetPageEmptyState'
import TableZeroState from '@components/ui/Table/TableZeroState'
import Table from '@components/ui/Table/Table'
import ClosetPageActions from '@components/common/ClosetPageActions'

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
      <ClosetPageTitle
        title="Your orders"
        actions={
          <ClosetPageActions
            actions={[
              {
                label: 'New order',
                primary: true,
                href: routes.internal.catalog.href(),
              },
            ]}
          />
        }
      />

      {!loading && !hasOrders ? (
        <ClosetPageEmptyState
          title="Start your first order"
          description="Placing an order sends your products to production."
          cta={{
            label: 'Start order',
            href: routes.internal.catalog.href(),
          }}
        />
      ) : (
        <>
          <ClosetOrdersTableFilters
            onChange={value => {
              const { date, ...rest } = value

              const { equality, ...dateRest } = date || {}

              handleChange({ where: { ...rest, createdAt: dateRest } })
            }}
          />

          <Table loading={loading}>
            {!orders.length ? (
              <TableZeroState />
            ) : (
              <>
                <div className="hidden md:block">
                  <ClosetOrdersDesktopTable {...tableProps} />
                </div>

                <div className="md:hidden">
                  <ClosetOrdersMobileTable {...tableProps} />
                </div>
              </>
            )}
          </Table>
        </>
      )}
    </ClosetPageContainer>
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
      hasOrders
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
