import {
  ProductPricingCalculatorGetQuoteQuery,
  ProductPricingCalculatorGetQuoteQueryVariables,
} from '@generated/ProductPricingCalculatorGetQuoteQuery'
import { gql, useLazyQuery } from '@apollo/client'
import { QuoteGeneratePrintLocationInput } from '@generated/globalTypes'
import { useEffect, useState } from 'react'

interface Props {
  catalogProductVariantId: number
  quantity: number
  printLocations: QuoteGeneratePrintLocationInput[]
  includeFulfillment: boolean
}

const useCalculatorFormQuote = ({
  catalogProductVariantId,
  quantity,
  printLocations,
  includeFulfillment,
}: Props) => {
  const [printLocationsCopy, setPrintLocationsCopy] = useState(printLocations)
  const [fetchMore, query] = useLazyQuery<
    ProductPricingCalculatorGetQuoteQuery,
    ProductPricingCalculatorGetQuoteQueryVariables
  >(GET_QUOTE, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  })

  if (JSON.stringify(printLocations) !== JSON.stringify(printLocationsCopy)) {
    setPrintLocationsCopy([...printLocations])
  }

  useEffect(() => {
    fetchMore({
      variables: {
        printLocations: printLocationsCopy,
        catalogProductVariantId,
        quantity,
        includeFulfillment,
      },
    })
  }, [
    fetchMore,
    catalogProductVariantId,
    quantity,
    printLocationsCopy,
    includeFulfillment,
  ])

  return query
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
