import { getOrThrow } from '../../utils'
import { MailingAddressRecord } from './db/mailing-address-table'
import { OrderItemRecord } from './db/order-item-table'
import { OrderRecord } from './db/order-table'

const applicationHost = getOrThrow(
  process.env.STITCHI_MARKETING_APPLICATION_HOST,
  'STITCHI_MARKETING_APPLICATION_HOST',
)

export interface OrderFactoryOrderItem extends OrderItemRecord {}

export interface OrderFactoryOrder extends OrderRecord {
  orderUrl: string
  items: OrderFactoryOrderItem[]
}

const orderFactory = ({
  orderRecord,
  orderItemRecords,
}: {
  orderRecord: OrderRecord
  orderItemRecords: OrderItemRecord[]
}): OrderFactoryOrder => {
  return {
    ...orderRecord,
    orderUrl: `${applicationHost}/orders/${orderRecord.id}`,
    items: orderItemRecords,
  }
}

export interface OrderFactoryMailingAddress extends MailingAddressRecord {}

const mailingAddressFactory = ({
  mailingAddressRecord,
}: {
  mailingAddressRecord: MailingAddressRecord
}): OrderFactoryMailingAddress => {
  return { ...mailingAddressRecord }
}

export { orderFactory, mailingAddressFactory }
