import { gql, useMutation } from '@apollo/client'
import { OrderCartCreateInput } from '@generated/globalTypes'
import {
  UseCreateOrderCreateOrderMutation,
  UseCreateOrderCreateOrderMutationVariables,
} from '@generated/UseCreateOrderCreateOrderMutation'

const useAddToCart = () => {
  const [createCart, createCartMutation] = useMutation<
    UseCreateOrderCreateOrderMutation,
    UseCreateOrderCreateOrderMutationVariables
  >(CREATE_ORDER)

  const addToCart = async (input: OrderCartCreateInput) => {
    try {
      const { data } = await createCart({
        variables: { input },
      })

      if (!data?.orderCartCreate?.order?.id) {
        throw new Error('Invariant violation: "order.id" is required')
      }

      return data.orderCartCreate.order
    } catch (error) {
      console.error(`Failed to add product ${input.productEntityId} to cart`, {
        context: { error, input },
      })
    }
  }

  return [addToCart, createCartMutation] as const
}

const CREATE_ORDER = gql`
  mutation UseCreateOrderCreateOrderMutation($input: OrderCartCreateInput!) {
    orderCartCreate(input: $input) {
      order {
        id
      }
    }
  }
`

export default useAddToCart
