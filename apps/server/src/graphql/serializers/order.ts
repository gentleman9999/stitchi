import {
  OrderFactoryOrder,
  OrderFactoryOrderItem,
  OrderFactoryMailingAddress,
} from '../../services/order/factory'
import { NexusGenObjects } from '../generated/nexus'

const humanizePaymentStatus = (
  status: OrderFactoryOrder['paymentStatus'],
): string => {
  switch (status) {
    case 'NOT_PAID':
      return 'Unpaid'
    case 'PAID':
      return 'Paid'
    case 'PARTIALLY_PAID':
      return 'Partially Paid'
    case 'REFUNDED':
      return 'Refunded'
    case 'PARTIALLY_REFUNDED':
      return 'Partially Refunded'
    default:
      throw new Error(`Unknown payment status: ${status}`)
  }
}

const orderItemTypeToGraphQL = (
  type: OrderFactoryOrderItem['type'],
): NexusGenObjects['OrderItem']['type'] => {
  switch (type) {
    case 'BIG_C_PRODUCT':
      return 'BIG_COMMERCE_PRODUCT'
    case 'CUSTOM':
      return 'CUSTOM'
    default:
      throw new Error(`Unknown order item type: ${type}`)
  }
}

const orderItemToGraphQl = (
  item: OrderFactoryOrderItem,
): NexusGenObjects['OrderItem'] => {
  return {
    ...item,
    type: orderItemTypeToGraphQL(item.type),
  }
}
export const orderFactoryOrderToGraphQL = (
  order: OrderFactoryOrder,
): NexusGenObjects['Order'] => {
  return {
    ...order,
    humanPaymentStatus: humanizePaymentStatus(order.paymentStatus),
    humanOrderId: order.humanReadableId,
    items: order.items.map(orderItemToGraphQl),
  }
}

export const mailingAddressFactoryToGraphQL = (
  mailindAddress: OrderFactoryMailingAddress,
): NexusGenObjects['MailingAddress'] => {
  return {
    ...mailindAddress,
  }
}
