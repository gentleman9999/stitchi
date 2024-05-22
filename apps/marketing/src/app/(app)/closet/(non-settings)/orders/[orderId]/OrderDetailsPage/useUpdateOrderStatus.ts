import { gql, useMutation } from '@apollo/client'
import {
  OrderStatusTemporary,
  UseUpdateOrderStatusUpdateStatusMutation,
  UseUpdateOrderStatusUpdateStatusMutationVariables,
} from '@generated/types'

interface Props {
  orderId: string
}

const useUpdateOrderStatus = ({ orderId }: Props) => {
  const [update, mutation] = useMutation<
    UseUpdateOrderStatusUpdateStatusMutation,
    UseUpdateOrderStatusUpdateStatusMutationVariables
  >(UPDATE_STATUS, {
    update(cache, { data }) {
      const order = data?.orderStatusTemporaryUpdate?.order

      if (order) {
        cache.evict({ id: cache.identify(order) })
        cache.gc()
      }
    },
  })

  const handleUpdate = async (status: OrderStatusTemporary) => {
    await update({
      variables: {
        input: {
          orderId,
          status,
        },
      },
    })
  }

  return [handleUpdate, mutation] as const
}

export const UPDATE_STATUS = gql`
  mutation UseUpdateOrderStatusUpdateStatusMutation(
    $input: OrderStatusTemporaryUpdateInput!
  ) {
    orderStatusTemporaryUpdate(input: $input) {
      order {
        id
      }
    }
  }
`

export default useUpdateOrderStatus
