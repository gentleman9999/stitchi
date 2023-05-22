import { OrderFactoryOrder } from './factory'
import makeOrderRepository, { OrderRepository } from './repository'
import { CreateOrderFnInput } from './repository/create-order'

export interface OrderClientService {
  createOrder: (input: {
    order: CreateOrderFnInput['order']
  }) => Promise<OrderFactoryOrder>
  getOrder: (input: { orderId: string }) => Promise<OrderFactoryOrder>
}

interface MakeClientParams {
  orderRepository: OrderRepository
}

type MakeClientFn = (params?: MakeClientParams) => OrderClientService

const makeClient: MakeClientFn = (
  { orderRepository } = {
    orderRepository: makeOrderRepository(),
  },
) => {
  return {
    createOrder: async input => {
      try {
        return orderRepository.createOrder({ order: input.order })
      } catch (error) {
        console.error(error)
        throw new Error('Failed to create order')
      }
    },
    getOrder: async input => {
      try {
        return orderRepository.getOrder({ orderId: input.orderId })
      } catch (error) {
        console.error(error)
        throw new Error('Failed to get order')
      }
    },
  }
}

export { makeClient }
