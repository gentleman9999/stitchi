import {
  PaymentClientService,
  makeClient as makePaymentServiceClient,
} from '../payment'
import { OrderFactoryOrder } from './factory'
import { getOrderPaymentStatus } from './helpers/get-order-payment-status'
import makeOrderRepository, { OrderRepository } from './repository'
import { CreateOrderFnInput } from './repository/create-order'

export interface OrderClientService {
  createOrder: (input: CreateOrderFnInput) => Promise<OrderFactoryOrder>
  getOrder: OrderRepository['getOrder']
  createMailingAddress: OrderRepository['createMailingAddress']
  getMailingAddress: OrderRepository['getMailingAddress']
  reconcileOrderPayments: (input: {
    orderId: string
  }) => Promise<OrderFactoryOrder>
}

interface MakeClientParams {
  orderRepository: OrderRepository
  paymentService: PaymentClientService
}

type MakeClientFn = (params?: MakeClientParams) => OrderClientService

const makeClient: MakeClientFn = (
  { orderRepository, paymentService } = {
    orderRepository: makeOrderRepository(),
    paymentService: makePaymentServiceClient(),
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
    reconcileOrderPayments: async input => {
      const order = await orderRepository.getOrder({ orderId: input.orderId })

      if (!order) {
        throw new Error('Order not found')
      }

      let paymentIntents

      try {
        paymentIntents = await paymentService.listPaymentIntents({
          orderId: order.id,
        })
      } catch (error) {
        console.error(error)
        throw new Error('Failed to list payment intents')
      }

      let totalAmountPaidCents = 0
      let totalAmountRefundedCents = 0

      for (const paymentIntent of paymentIntents) {
        switch (paymentIntent.status) {
          case 'succeeded':
            totalAmountPaidCents += paymentIntent.amount
            break
        }
      }

      let totalAmountDueCents = order.totalPriceCents - totalAmountPaidCents

      const paymentStatus = getOrderPaymentStatus({
        totalAmountCents: order.totalPriceCents,
        totalAmountDueCents,
        totalAmountPaidCents,
        totalAmountRefundedCents,
      })

      let updatedOrder

      try {
        updatedOrder = await orderRepository.updateOrder({
          order: {
            ...order,
            totalAmountPaidCents,
            totalAmountRefundedCents,
            totalAmountDueCents,
            paymentStatus,
          },
        })
      } catch (error) {
        console.error(`Failed to update order ${order.id}`, {
          context: { error },
        })
        throw new Error('Failed to update order')
      }

      return updatedOrder
    },
  }
}

export { makeClient }
