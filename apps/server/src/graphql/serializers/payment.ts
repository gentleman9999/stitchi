import {
  PaymentIntentFactoryPaymentIntent,
  PaymentMethodFactoryPaymentMethod,
} from '../../services/payment/factory'
import { NexusGenObjects } from '../generated/nexus'

export const paymentIntentFactoryPaymentIntentToGraphQL = (
  paymentIntent: PaymentIntentFactoryPaymentIntent,
): NexusGenObjects['PaymentIntent'] => {
  return {
    ...paymentIntent,
  }
}

export const paymentMethodFactoryPaymentMethodToGraphQL = (
  paymentMethod: PaymentMethodFactoryPaymentMethod,
): NexusGenObjects['PaymentMethod'] => {
  return {
    ...paymentMethod,
  }
}
