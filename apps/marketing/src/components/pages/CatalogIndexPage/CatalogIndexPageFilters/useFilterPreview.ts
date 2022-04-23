import { gql, useQuery } from '@apollo/client'
import {
  UseFilterPreviewGetDataQuery,
  UseFilterPreviewGetDataQueryVariables,
} from '@generated/UseFilterPreviewGetDataQuery'
import React from 'react'

interface Props {
  filters: UseFilterPreviewGetDataQueryVariables['filters']
}

const useFilterPreview = ({ filters }: Props) => {
  const { data, loading, refetch, previousData } = useQuery<
    UseFilterPreviewGetDataQuery,
    UseFilterPreviewGetDataQueryVariables
  >(GET_DATA, {
    variables: { filters },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: false,
  })

  React.useEffect(() => {
    if (!loading) {
      refetch({ filters })
    }
  }, [filters, loading, refetch])

  return {
    loading,
    count: getCount(data) || getCount(previousData),
    hasMore: Boolean(
      data?.site.search.searchProducts.products.pageInfo.hasNextPage,
    ),
  }
}

const getCount = (data?: UseFilterPreviewGetDataQuery) => {
  return (
    data?.site.search.searchProducts.products.edges?.map(edge => edge?.node)
      .length || null
  )
}

const GET_DATA = gql`
  query UseFilterPreviewGetDataQuery($filters: SearchProductsFiltersInput!) {
    site {
      search {
        searchProducts(filters: $filters) {
          products(first: 50) {
            edges {
              node {
                id
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      }
    }
  }
`

export default useFilterPreview
