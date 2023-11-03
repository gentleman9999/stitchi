import {
  UseProductQuoteGetQuoteQuery,
  UseProductQuoteGetQuoteQueryVariables,
} from '@generated/UseProductQuoteGetQuoteQuery'
import { gql, useLazyQuery } from '@apollo/client'
import { useCallback } from 'react'

interface Props {
  designProductId: string
}

const useProductQuote = ({ designProductId }: Props) => {
  const [fetchMore, query] = useLazyQuery<
    UseProductQuoteGetQuoteQuery,
    UseProductQuoteGetQuoteQueryVariables
  >(GET_QUOTE, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  })

  const getQuote = useCallback(
    async (input: { quantity: number }) => {
      await fetchMore({ variables: { ...input, designProductId } })
    },
    [designProductId, fetchMore],
  )

  return [
    getQuote,
    { ...query, quote: query.data?.designProduct?.quote },
  ] as const
}

export const GET_QUOTE = gql`
  query UseProductQuoteGetQuoteQuery($designProductId: ID!, $quantity: Int!) {
    designProduct(id: $designProductId) {
      id
      quote(quantity: $quantity) {
        id
        productTotalCostCents
        productUnitCostCents
      }
    }
  }
`

export default useProductQuote
