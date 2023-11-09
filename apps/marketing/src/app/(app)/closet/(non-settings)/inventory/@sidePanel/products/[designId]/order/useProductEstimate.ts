import { gql, useLazyQuery } from '@apollo/client'
import {
  UseProductEstimateGetEstimateQuery,
  UseProductEstimateGetEstimateQueryVariables,
} from '@generated/types'
import { useCallback } from 'react'

interface Props {
  designProductId: string
}

const useProductEstimate = ({ designProductId }: Props) => {
  const [fetchMore, query] = useLazyQuery<
    UseProductEstimateGetEstimateQuery,
    UseProductEstimateGetEstimateQueryVariables
  >(GET_QUOTE, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  })

  const getEstimate = useCallback(
    async (input: { quantity: number }) => {
      await fetchMore({ variables: { ...input, designProductId } })
    },
    [designProductId, fetchMore],
  )

  return [
    getEstimate,
    { ...query, estimate: query.data?.designProduct?.estimate },
  ] as const
}

export const GET_QUOTE = gql`
  query UseProductEstimateGetEstimateQuery(
    $designProductId: ID!
    $quantity: Int!
  ) {
    designProduct(id: $designProductId) {
      id
      estimate(quantity: $quantity) {
        id
        productTotalCostCents
        productUnitCostCents
      }
    }
  }
`

export default useProductEstimate
