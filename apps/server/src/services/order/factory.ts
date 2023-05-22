import { OrderItemRecord } from './db/order-item-table'
import { OrderRecord } from './db/order-table'

export interface OrderFactoryOrderItem extends OrderItemRecord {}

export interface OrderFactoryOrder extends OrderRecord {
  items: OrderFactoryOrderItem[]
}

const orderFactory = ({
  orderRecord,
  orderItemRecords,
}: {
  orderRecord: OrderRecord
  orderItemRecords: OrderItemRecord[]
}): OrderFactoryOrder => {
  return { ...orderRecord, items: orderItemRecords }
}

export { orderFactory }
