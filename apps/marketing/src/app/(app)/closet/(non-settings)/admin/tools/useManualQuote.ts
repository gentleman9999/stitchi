import { gql, useMutation } from '@apollo/client'
import {
  CatalogManualQuoteCreateInput,
  UseManualQuoteCreateQuoteMutation,
  UseManualQuoteCreateQuoteMutationVariables,
} from '@generated/types'

const useManualQuote = () => {
  const [createQuote, createQuoteMutation] = useMutation<
    UseManualQuoteCreateQuoteMutation,
    UseManualQuoteCreateQuoteMutationVariables
  >(CREATE_QUOTE)

  const handleCreateQuote = (input: CatalogManualQuoteCreateInput) => {
    return createQuote({
      variables: { input },
    })
  }

  const quote = createQuoteMutation.data?.catalogManualQuoteCreate?.quote

  return [handleCreateQuote, { quote, ...createQuoteMutation }] as const
}

const CREATE_QUOTE = gql`
  mutation UseManualQuoteCreateQuoteMutation(
    $input: CatalogManualQuoteCreateInput!
  ) {
    catalogManualQuoteCreate(input: $input) {
      quote {
        id
        productTotalCostCents
        productUnitCostCents
      }
    }
  }
`
export default useManualQuote
