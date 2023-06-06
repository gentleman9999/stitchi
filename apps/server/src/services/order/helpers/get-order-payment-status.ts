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
  if (totalAmountCents === 0) {
    return OrderRecordPaymentStatus.NOT_PAID
  }

  if (totalAmountPaidCents === 0) {
    return OrderRecordPaymentStatus.NOT_PAID
  }

  if (totalAmountRefundedCents > 0) {
    if (totalAmountCents === totalAmountRefundedCents) {
      return OrderRecordPaymentStatus.REFUNDED
    } else {
      return OrderRecordPaymentStatus.PARTIALLY_REFUNDED
    }
  }

  if (totalAmountPaidCents >= totalAmountCents) {
    return OrderRecordPaymentStatus.PAID
  } else if (totalAmountPaidCents > 0) {
    return OrderRecordPaymentStatus.PARTIALLY_PAID
  }

  throw new Error('Failed to get order payment status')
}

export { getOrderPaymentStatus }
