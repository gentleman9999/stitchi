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
    notifyOnNetworkStatusChange: true,
  })

  React.useEffect(() => {
    refetch({ filters })
  }, [filters, refetch])

  const currentCount =
    data?.site.search.searchProducts.products.collectionInfo?.totalItems

  const previousCount =
    previousData?.site.search.searchProducts.products.collectionInfo
      ?.totalItems || 0

  return {
    loading,
    count: currentCount !== undefined ? currentCount : previousCount,
  }
}

const GET_DATA = gql`
  query UseFilterPreviewGetDataQuery($filters: SearchProductsFiltersInput!) {
    site {
      search {
        searchProducts(filters: $filters) {
          products(first: 50) {
            collectionInfo {
              totalItems
            }
          }
        }
      }
    }
  }
`

export default useFilterPreview
