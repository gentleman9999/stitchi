import { gql, useMutation } from '@apollo/client'
import {
  DesignProductCreateQuoteInput,
  UseProductEstimateCreateQuoteMutation,
  UseProductEstimateCreateQuoteMutationVariables,
} from '@generated/types'
import { useCallback } from 'react'

interface Props {
  designProductId: string
}

const useProductEstimate = ({ designProductId }: Props) => {
  const [createQuote, mutation] = useMutation<
    UseProductEstimateCreateQuoteMutation,
    UseProductEstimateCreateQuoteMutationVariables
  >(CREATE_QUOTE)

  const getEstimate = useCallback(
    async (input: Omit<DesignProductCreateQuoteInput, 'designProductId'>) => {
      if (input.variants.length) {
        await createQuote({
          variables: { input: { ...input, designProductId } },
        })
      }
    },
    [createQuote, designProductId],
  )

  return [
    getEstimate,
    { ...mutation, estimate: mutation.data?.designProductCreateQuote?.quote },
  ] as const
}

const CREATE_QUOTE = gql`
  mutation UseProductEstimateCreateQuoteMutation(
    $input: DesignProductCreateQuoteInput!
  ) {
    designProductCreateQuote(input: $input) {
      quote {
        id
        productTotalCostCents
        productUnitCostCents
      }
    }
  }
`

export default useProductEstimate
