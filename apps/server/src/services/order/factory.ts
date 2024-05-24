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
    id: orderRecord.id,
    membershipId: orderRecord.membershipId,
    organizationId: orderRecord.organizationId,
    userId: orderRecord.userId,
    designRequestId: orderRecord.designRequestId,
    humanReadableId: orderRecord.humanReadableId,
    shippingAddressId: orderRecord.shippingAddressId,
    orderUrl: `${applicationHost}/api/orders/${orderRecord.id}`,
    items: orderItemRecords,

    paymentStatus: orderRecord.paymentStatus,
    statusTemporary: orderRecord.statusTemporary,
    type: orderRecord.type,

    customerEmail: orderRecord.customerEmail,
    customerFirstName: orderRecord.customerFirstName,
    customerLastName: orderRecord.customerLastName,
    customerPhone: orderRecord.customerPhone,

    subtotalPriceCents: orderRecord.subtotalPriceCents,
    totalAmountDueCents: orderRecord.totalAmountDueCents,
    totalAmountPaidCents: orderRecord.totalAmountPaidCents,
    totalAmountRefundedCents: orderRecord.totalAmountRefundedCents,
    totalPriceCents: orderRecord.totalPriceCents,
    totalProcessingFeeCents: orderRecord.totalProcessingFeeCents,
    totalTaxCents: orderRecord.totalTaxCents,
    totalShippingCents: orderRecord.totalShippingCents,

    createdAt: orderRecord.createdAt,
    updatedAt: orderRecord.updatedAt,
  }
}

export interface OrderFactoryMailingAddress extends MailingAddressRecord {}

const mailingAddressFactory = ({
  mailingAddressRecord,
}: {
  mailingAddressRecord: MailingAddressRecord
}): OrderFactoryMailingAddress => {
  return {
    id: mailingAddressRecord.id,
    membershipId: mailingAddressRecord.membershipId,
    organizationId: mailingAddressRecord.organizationId,
    name: mailingAddressRecord.name,
    firstName: mailingAddressRecord.firstName,
    lastName: mailingAddressRecord.lastName,
    phone: mailingAddressRecord.phone,
    company: mailingAddressRecord.company,

    address1: mailingAddressRecord.address1,
    address2: mailingAddressRecord.address2,
    city: mailingAddressRecord.city,
    country: mailingAddressRecord.country,
    zip: mailingAddressRecord.zip,
    latitude: mailingAddressRecord.latitude,
    longitude: mailingAddressRecord.longitude,
    province: mailingAddressRecord.province,
    provinceCode: mailingAddressRecord.provinceCode,

    createdAt: mailingAddressRecord.createdAt,
    updatedAt: mailingAddressRecord.updatedAt,
  }
}

export { orderFactory, mailingAddressFactory }
