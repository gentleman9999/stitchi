import { OrderFactoryOrder } from './factory'
import makeOrderRepository, { OrderRepository } from './repository'
import { CreateOrderFnInput } from './repository/create-order'

export interface OrderClientService {
  createOrder: (input: CreateOrderFnInput) => Promise<OrderFactoryOrder>
  getOrder: OrderRepository['getOrder']
  createMailingAddress: OrderRepository['createMailingAddress']
  getMailingAddress: OrderRepository['getMailingAddress']
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
    createMailingAddress: async input => {
      try {
        return orderRepository.createMailingAddress({
          mailingAddress: input.mailingAddress,
        })
      } catch (error) {
        console.error(error)
        throw new Error('Failed to create mailing address')
      }
    },
    getMailingAddress: async input => {
      try {
        return orderRepository.getMailingAddress({
          mailingAddressId: input.mailingAddressId,
        })
      } catch (error) {
        console.error(error)
        throw new Error('Failed to get mailing address')
      }
    },
  }
}

export { makeClient }
