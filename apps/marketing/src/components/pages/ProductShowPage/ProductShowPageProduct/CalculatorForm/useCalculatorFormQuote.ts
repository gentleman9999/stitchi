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
}

const useCalculatorFormQuote = ({
  catalogProductVariantId,
  quantity,
  printLocations,
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
      },
    })
  }, [fetchMore, catalogProductVariantId, quantity, printLocationsCopy])

  return query
}

export const GET_QUOTE = gql`
  query ProductPricingCalculatorGetQuoteQuery(
    $catalogProductVariantId: Int!
    $printLocations: [QuoteGeneratePrintLocationInput!]!
    $quantity: Int!
  ) {
    quoteGenerate(
      catalogProductVariantId: $catalogProductVariantId
      printLocations: $printLocations
      quantity: $quantity
    ) {
      id
      productTotalCostCents
      productUnitCostCents
    }
  }
`

export default useCalculatorFormQuote
