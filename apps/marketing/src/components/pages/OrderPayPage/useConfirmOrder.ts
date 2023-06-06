import { gql, useMutation } from '@apollo/client'
import { OrderConfirmInput } from '@generated/globalTypes'
import {
  UseConfirmOrderConfirmOrderMutation,
  UseConfirmOrderConfirmOrderMutationVariables,
} from '@generated/UseConfirmOrderConfirmOrderMutation'

interface Props {
  orderId: string
}

const useConfirmOrder = ({ orderId }: Props) => {
  const [confirm, confirmMutation] = useMutation<
    UseConfirmOrderConfirmOrderMutation,
    UseConfirmOrderConfirmOrderMutationVariables
  >(CONFIRM_ORDER, {
    update: (cache, { data }) => {
      const order = data?.orderConfirm?.order

      if (order) {
        cache.evict({ id: cache.identify({ ...order }) })
        cache.gc()
      }
    },
  })

  const handleConfirm = async (input: Omit<OrderConfirmInput, 'orderId'>) => {
    const result = await confirm({
      variables: {
        input: {
          orderId,
          ...input,
        },
      },
    })

    return result
  }

  return [handleConfirm, confirmMutation] as const
}

const CONFIRM_ORDER = gql`
  mutation UseConfirmOrderConfirmOrderMutation($input: OrderConfirmInput!) {
    orderConfirm(input: $input) {
      order {
        id
      }
    }
  }
`

export default useConfirmOrder
