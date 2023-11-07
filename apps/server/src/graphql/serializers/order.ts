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
    id: item.id,
    orderId: item.orderId,
    productId: item.productId,
    productVariantId: item.productVariantId,

    type: orderItemTypeToGraphQL(item.type),

    title: item.title,
    quantity: item.quantity,
    unitPriceCents: item.unitPriceCents,
    totalPriceCents: item.totalPriceCents,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }
}
export const orderFactoryOrderToGraphQL = (
  order: OrderFactoryOrder,
): NexusGenObjects['Order'] => {
  return {
    id: order.id,
    membershipId: order.membershipId,
    organizationId: order.organizationId,
    humanOrderId: order.humanReadableId,
    shippingAddressId: order.shippingAddressId,
    designRequestId: order.designRequestId,

    type: order.type,
    paymentStatus: order.paymentStatus,
    humanPaymentStatus: humanizePaymentStatus(order.paymentStatus),

    subtotalPriceCents: order.subtotalPriceCents,
    totalAmountDueCents: order.totalAmountDueCents,
    totalAmountPaidCents: order.totalAmountPaidCents,
    totalAmountRefundedCents: order.totalAmountRefundedCents,
    totalPriceCents: order.totalPriceCents,
    totalProcessingFeeCents: order.totalProcessingFeeCents,
    totalShippingCents: order.totalShippingCents,
    totalTaxCents: order.totalTaxCents,

    customerEmail: order.customerEmail,
    customerFirstName: order.customerFirstName,
    customerLastName: order.customerLastName,
    customerPhone: order.customerPhone,

    items: order.items.map(orderItemToGraphQl),

    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }
}

export const mailingAddressFactoryToGraphQL = (
  mailindAddress: OrderFactoryMailingAddress,
): NexusGenObjects['MailingAddress'] => {
  return {
    id: mailindAddress.id,
    membershipId: mailindAddress.membershipId,
    organizationId: mailindAddress.organizationId,

    name: mailindAddress.name,
    company: mailindAddress.company,
    address1: mailindAddress.address1,
    address2: mailindAddress.address2,
    city: mailindAddress.city,
    country: mailindAddress.country,
    firstName: mailindAddress.firstName,
    lastName: mailindAddress.lastName,
    latitude: mailindAddress.latitude,
    longitude: mailindAddress.longitude,
    phone: mailindAddress.phone,
    province: mailindAddress.province,
    zip: mailindAddress.zip,
    provinceCode: mailindAddress.provinceCode,

    createdAt: mailindAddress.createdAt,
    updatedAt: mailindAddress.updatedAt,
  }
}
