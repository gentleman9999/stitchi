import { OrderRecordPaymentStatus } from '../db/order-table'
import { OrderFactoryOrder } from '../factory'

const getOrderPaymentStatus = ({
  totalAmountCents,
  totalAmountDueCents,
  totalAmountPaidCents,
  totalAmountRefundedCents,
}: {
  totalAmountCents: number
  totalAmountPaidCents: number
  totalAmountRefundedCents: number
  totalAmountDueCents: number
}): OrderFactoryOrder['paymentStatus'] => {
  if (totalAmountPaidCents === 0) {
    return OrderRecordPaymentStatus.NOT_PAID
  }

  if (
    totalAmountRefundedCents > 0 &&
    totalAmountRefundedCents === totalAmountCents
  ) {
    return OrderRecordPaymentStatus.REFUNDED
  } else if (totalAmountRefundedCents > 0) {
    return OrderRecordPaymentStatus.PARTIALLY_REFUNDED
  }

  if (totalAmountDueCents === 0) {
    return OrderRecordPaymentStatus.PAID
  } else if (totalAmountDueCents > 0) {
    return OrderRecordPaymentStatus.PARTIALLY_PAID
  }

  throw new Error('Failed to get order payment status')
}

export { getOrderPaymentStatus }
