import {
  PaymentClientService,
  makeClient as makePaymentServiceClient,
} from '../payment'
import { OrderFactoryOrder } from './factory'
import makeOrderRepository, { OrderRepository } from './repository'
import { CreateOrderFnInput } from './repository/create-order'
import { addSeconds, isBefore } from 'date-fns'
import { reconcileOrderPayments } from './helpers/reconcile-order-payments'
import { logger } from '../../telemetry'
import {
  NotificationClientService,
  makeClient as makeNotificationServiceClient,
} from '../notification'
import { Actor } from '../types'
import { GetOrderFnInput } from './repository/get-order'

export interface OrderClientService {
  createOrder: (input: CreateOrderFnInput) => Promise<OrderFactoryOrder>
  updateOrder: OrderRepository['updateOrder']
  getOrder: (
    input: GetOrderFnInput,
    config: { actor: Actor },
  ) => Promise<OrderFactoryOrder>
  listOrders: OrderRepository['listOrders']
  listOrdersCount: OrderRepository['listOrdersCount']
  createMailingAddress: OrderRepository['createMailingAddress']
  getMailingAddress: OrderRepository['getMailingAddress']
  reconcileOrderPayments: (input: {
    orderId: string
    actor: Actor | null
  }) => Promise<OrderFactoryOrder>
}

interface MakeClientParams {
  orderRepository: OrderRepository
  paymentService: PaymentClientService
  notificationService: NotificationClientService
}

type MakeClientFn = (params?: MakeClientParams) => OrderClientService

const makeClient: MakeClientFn = (
  { orderRepository, paymentService, notificationService } = {
    orderRepository: makeOrderRepository(),
    paymentService: makePaymentServiceClient(),
    notificationService: makeNotificationServiceClient(),
  },
) => {
  return {
    createOrder: async input => {
      let order

      const orderItems = input.order.items.filter(item => item.quantity > 0)

      try {
        order = await orderRepository.createOrder({
          order: { ...input.order, items: orderItems },
        })
      } catch (error) {
        throw new Error('Failed to create order')
      }

      let topicKey = `order:${order.id}`

      let members: string[] = []

      if (order.membershipId) {
        members.push(order.membershipId)
      }

      try {
        await notificationService.createNotificationTopic(topicKey, members)
      } catch (error) {
        throw new Error('Failed to create notification topic')
      }

      return order
    },

    getOrder: async (input, { actor }) => {
      try {
        const order = await orderRepository.getOrder({ orderId: input.orderId })

        // We should update the payment status ever 60 seconds to account for any missed webhook events.
        // Likely a better way to implement this in the future.
        if (
          !order.updatedAt ||
          isBefore(addSeconds(order.updatedAt, 60), new Date())
        ) {
          return reconcileOrderPayments({
            order,
            orderRepository,
            paymentService,
            actor,
          })
        } else {
          return order
        }
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to get order')
      }
    },

    createMailingAddress: async input => {
      try {
        return orderRepository.createMailingAddress({
          mailingAddress: input.mailingAddress,
        })
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to create mailing address')
      }
    },

    getMailingAddress: async input => {
      try {
        return orderRepository.getMailingAddress({
          mailingAddressId: input.mailingAddressId,
        })
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to get mailing address')
      }
    },

    updateOrder: async input => {
      const orderItems = input.order.items.filter(item => item.quantity > 0)

      try {
        return orderRepository.updateOrder({
          actor: input.actor,
          order: { ...input.order, items: orderItems },
        })
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to update order')
      }
    },

    listOrders: async input => {
      try {
        return orderRepository.listOrders(input)
      } catch (error) {
        throw new Error('Failed to list orders')
      }
    },

    listOrdersCount: async input => {
      try {
        return orderRepository.listOrdersCount(input)
      } catch (error) {
        throw new Error('Failed to list orders count')
      }
    },

    reconcileOrderPayments: async input => {
      const order = await orderRepository.getOrder({ orderId: input.orderId })

      if (!order) {
        throw new Error('Order not found')
      }

      return reconcileOrderPayments({
        order,
        orderRepository,
        paymentService,
        actor: input.actor || {
          membershipId: order.membershipId || null,
          organizationId: order.organizationId || null,
          userId: order.userId || null,
          gaClientId: null,
        },
      })
    },
  }
}

export { makeClient }
