import {
  OrderFactoryOrder,
  OrderFactoryOrderItem,
} from '../../services/order/factory'
import { NexusGenObjects } from '../generated/nexus'

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
    id: order.id,
    userId: order.userId,
    paymentStatus: order.paymentStatus,
    type: order.type,
    humanOrderId: order.humanReadableId,
    items: order.items.map(orderItemToGraphQl),
  }
}
