import deepEqual from 'deep-equal'
import React from 'react'
import {
  ProductFormGetProductQuoteQuery,
  ProductFormGetProductQuoteQueryVariables,
} from '@generated/ProductFormGetProductQuoteQuery'
import { gql, useQuery } from '@apollo/client'
import {
  ProductFormGetProductQuoteMaxQuery,
  ProductFormGetProductQuoteMaxQueryVariables,
} from '@generated/ProductFormGetProductQuoteMaxQuery'

const MAX_QUANTITY = 20_000

const DEFAULT_PRINT_LOCATIONS = [
  {
    colorCount: 1,
  },
]

const useProductQuote = ({
  productId,
  quantity,
  printLocations,
}: ProductFormGetProductQuoteQueryVariables) => {
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
    ProductFormGetProductQuoteQuery,
    ProductFormGetProductQuoteQueryVariables
  >(GET_PRODUCT_QUOTE, {
    variables: variables,
  })

  const { data: maxQuoteData } = useQuery<
    ProductFormGetProductQuoteMaxQuery,
    ProductFormGetProductQuoteMaxQueryVariables
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

  const quote = data?.site.product?.quote

  return {
    quote,
    maxQuote: maxQuoteData?.site.product?.maxQuote,
    loading,
  }
}

const GET_PRODUCT_QUOTE = gql`
  query ProductFormGetProductQuoteQuery(
    $productId: ID!
    $quantity: Int!
    $printLocations: [QuoteGeneratePrintLocationInput!]!
  ) {
    site {
      product(id: $productId) {
        id
        quote(quantity: $quantity, printLocations: $printLocations) {
          id
          productUnitCostCents
        }
      }
    }
  }
`

const GET_PRODUCT_QUOTE_MAX = gql`
  query ProductFormGetProductQuoteMaxQuery($productId: ID!) {
    site {
      product(id: $productId) {
        id
        maxQuote: quote(quantity: 50, printLocations: [{ colorCount: 4 }]) {
          id
          productUnitCostCents
        }
      }
    }
  }
`

export default useProductQuote
