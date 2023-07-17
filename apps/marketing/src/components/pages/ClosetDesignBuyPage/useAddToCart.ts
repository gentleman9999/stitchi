import { gql, useMutation } from '@apollo/client'
import { DesignProductCreateOrderInput } from '@generated/globalTypes'
import {
  UseCreateOrderCreateOrderMutation,
  UseCreateOrderCreateOrderMutationVariables,
} from '@generated/UseCreateOrderCreateOrderMutation'

const useAddToCart = () => {
  const [createCart, createCartMutation] = useMutation<
    UseCreateOrderCreateOrderMutation,
    UseCreateOrderCreateOrderMutationVariables
  >(CREATE_ORDER)

  const addToCart = async (input: DesignProductCreateOrderInput) => {
    try {
      const { data } = await createCart({
        variables: { input },
      })

      if (!data?.designProductCreateOrder?.order?.id) {
        throw new Error('Invariant violation: "order.id" is required')
      }

      return data.designProductCreateOrder.order
    } catch (error) {
      console.error(
        `Failed to add design product ${input.designProductId} to cart`,
        {
          context: { error, input },
        },
      )
    }
  }

  return [addToCart, createCartMutation] as const
}

const CREATE_ORDER = gql`
  mutation UseCreateOrderCreateOrderMutation(
    $input: DesignProductCreateOrderInput!
  ) {
    designProductCreateOrder(input: $input) {
      order {
        id
      }
    }
  }
`

export default useAddToCart
