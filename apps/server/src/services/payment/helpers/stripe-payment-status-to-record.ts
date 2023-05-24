import Stripe from 'stripe'
import { PaymentIntentRecordStatus } from '../db/payment-intent-table'

export const stripePaymentStatusToRecord = (
  status: Stripe.PaymentIntent['status'],
): PaymentIntentRecordStatus => {
  switch (status) {
    case 'requires_payment_method':
      return PaymentIntentRecordStatus.REQUIRES_PAYMENT_METHOD
    case 'requires_confirmation':
      return PaymentIntentRecordStatus.REQUIRES_CONFIRMATION
    case 'requires_action':
      return PaymentIntentRecordStatus.REQUIRES_ACTION
    case 'processing':
      return PaymentIntentRecordStatus.PROCESSING
    case 'requires_capture':
      return PaymentIntentRecordStatus.REQUIRES_CAPTURE
    case 'canceled':
      return PaymentIntentRecordStatus.CANCELED
    case 'succeeded':
      return PaymentIntentRecordStatus.SUCCEEDED

    default:
      throw new Error(`Unknown payment intent status: ${status}`)
  }
}
