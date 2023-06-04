import {
  UseProductQuoteGetQuoteQuery,
  UseProductQuoteGetQuoteQueryVariables,
} from '@generated/UseProductQuoteGetQuoteQuery'
import { gql, useLazyQuery } from '@apollo/client'
import { QuoteGeneratePrintLocationInput } from '@generated/globalTypes'
import { useCallback } from 'react'

interface Props {
  catalogProductEntityId: number
}

const useProductQuote = ({ catalogProductEntityId }: Props) => {
  const [fetchMore, query] = useLazyQuery<
    UseProductQuoteGetQuoteQuery,
    UseProductQuoteGetQuoteQueryVariables
  >(GET_QUOTE, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  })

  const getQuote = useCallback(
    async (input: {
      quantity: number
      printLocations: QuoteGeneratePrintLocationInput[]
      includeFulfillment: boolean
    }) => {
      await fetchMore({ variables: { ...input, catalogProductEntityId } })
    },
    [catalogProductEntityId, fetchMore],
  )

  return [
    getQuote,
    { ...query, quote: query.data?.site.product?.quote },
  ] as const
}

export const GET_QUOTE = gql`
  query UseProductQuoteGetQuoteQuery(
    $catalogProductEntityId: Int!
    $printLocations: [QuoteGeneratePrintLocationInput!]!
    $quantity: Int!
    $includeFulfillment: Boolean
  ) {
    site {
      product(entityId: $catalogProductEntityId) {
        id
        quote(
          printLocations: $printLocations
          quantity: $quantity
          includeFulfillment: $includeFulfillment
        ) {
          id
          productTotalCostCents
          productUnitCostCents
        }
      }
    }
  }
`

export default useProductQuote
