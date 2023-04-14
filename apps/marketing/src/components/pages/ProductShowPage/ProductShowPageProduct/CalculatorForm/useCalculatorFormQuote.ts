import {
  ProductPricingCalculatorGetQuoteQuery,
  ProductPricingCalculatorGetQuoteQueryVariables,
} from '@generated/ProductPricingCalculatorGetQuoteQuery'
import { gql, useLazyQuery } from '@apollo/client'
import { QuoteGeneratePrintLocationInput } from '@generated/globalTypes'
import { useCallback } from 'react'

interface Props {
  catalogProductVariantId: number
}

const useCalculatorFormQuote = ({ catalogProductVariantId }: Props) => {
  const [fetchMore, query] = useLazyQuery<
    ProductPricingCalculatorGetQuoteQuery,
    ProductPricingCalculatorGetQuoteQueryVariables
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
      await fetchMore({ variables: { ...input, catalogProductVariantId } })
    },
    [catalogProductVariantId, fetchMore],
  )

  return [getQuote, query] as const
}

export const GET_QUOTE = gql`
  query ProductPricingCalculatorGetQuoteQuery(
    $catalogProductVariantId: Int!
    $printLocations: [QuoteGeneratePrintLocationInput!]!
    $quantity: Int!
    $includeFulfillment: Boolean
  ) {
    quoteGenerate(
      catalogProductVariantId: $catalogProductVariantId
      printLocations: $printLocations
      quantity: $quantity
      includeFulfillment: $includeFulfillment
    ) {
      id
      productTotalCostCents
      productUnitCostCents
    }
  }
`

export default useCalculatorFormQuote
