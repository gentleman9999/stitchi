import { PaymentIntentFactoryPaymentIntent } from '../../services/payment/factory'
import { NexusGenObjects } from '../generated/nexus'

export const paymentIntentFactoryPaymentIntentToGraphQL = (
  paymentIntent: PaymentIntentFactoryPaymentIntent,
): NexusGenObjects['PaymentIntent'] => {
  return {
    ...paymentIntent,
    clientSecret: paymentIntent.stripePaymentIntentClientSecret,
  }
}
