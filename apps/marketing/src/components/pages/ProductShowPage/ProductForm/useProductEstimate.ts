import { gql, useQuery } from '@apollo/client'
import {
  ProductFormGetProductEstimateMaxQuery,
  ProductFormGetProductEstimateMaxQueryVariables,
  ProductFormGetProductEstimateQuery,
  ProductFormGetProductEstimateQueryVariables,
} from '@generated/types'
import deepEqual from 'deep-equal'
import React from 'react'

const MAX_QUANTITY = 20_000

const DEFAULT_PRINT_LOCATIONS = [
  {
    colorCount: 1,
  },
]

const useProductEstimate = ({
  productId,
  quantity,
  printLocations,
}: ProductFormGetProductEstimateQueryVariables) => {
  const variables = React.useMemo(
    () => ({
      productId,
      printLocations: printLocations.length
        ? printLocations
        : DEFAULT_PRINT_LOCATIONS,
      quantity: quantity || MAX_QUANTITY,
    }),
    [printLocations, productId, quantity],
  )

  const {
    data,
    loading,
    refetch,
    variables: prevVariables,
  } = useQuery<
    ProductFormGetProductEstimateQuery,
    ProductFormGetProductEstimateQueryVariables
  >(GET_PRODUCT_QUOTE, {
    variables: variables,
  })

  const { data: maxEstimateData } = useQuery<
    ProductFormGetProductEstimateMaxQuery,
    ProductFormGetProductEstimateMaxQueryVariables
  >(GET_PRODUCT_QUOTE_MAX, {
    variables: {
      productId,
    },
  })

  React.useEffect(() => {
    if (!deepEqual(variables, prevVariables)) {
      refetch(variables)
    }
  }, [prevVariables, refetch, variables])

  const estimate = data?.site.product?.estimate

  return {
    estimate,
    maxEstimate: maxEstimateData?.site.product?.maxEstimate,
    loading,
  }
}

const GET_PRODUCT_QUOTE = gql`
  query ProductFormGetProductEstimateQuery(
    $productId: ID!
    $quantity: Int!
    $printLocations: [QuoteGeneratePrintLocationInput!]!
  ) {
    site {
      product(id: $productId) {
        id
        estimate(quantity: $quantity, printLocations: $printLocations) {
          id
          productUnitCostCents
        }
      }
    }
  }
`

const GET_PRODUCT_QUOTE_MAX = gql`
  query ProductFormGetProductEstimateMaxQuery($productId: ID!) {
    site {
      product(id: $productId) {
        id
        maxEstimate: estimate(
          quantity: 50
          printLocations: [{ colorCount: 4 }]
        ) {
          id
          productUnitCostCents
        }
      }
    }
  }
`

export default useProductEstimate
