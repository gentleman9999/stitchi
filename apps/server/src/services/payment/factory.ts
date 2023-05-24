import { PaymentIntentRecord } from './db/payment-intent-table'

export interface PaymentIntentFactoryPaymentIntent
  extends PaymentIntentRecord {}

export const paymentIntentFactory = ({
  paymentIntentRecord,
}: {
  paymentIntentRecord: PaymentIntentRecord
}): PaymentIntentFactoryPaymentIntent => {
  return { ...paymentIntentRecord }
}
