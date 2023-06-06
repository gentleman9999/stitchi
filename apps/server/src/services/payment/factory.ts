import Stripe from 'stripe'

export interface RefundFactoryRefund {
  id: string
  amount: number
  reason: Stripe.Refund.Reason | null
  status: Stripe.Refund['status']
  paymentIntentId: string | null
}

export const refundFactory = ({
  stripeRefund,
}: {
  stripeRefund: Stripe.Refund
}): RefundFactoryRefund => {
  stripeRefund
  return {
    id: stripeRefund.id,
    amount: stripeRefund.amount,
    reason: stripeRefund.reason,
    status: stripeRefund.status,
    paymentIntentId:
      typeof stripeRefund.payment_intent === 'string'
        ? stripeRefund.payment_intent
        : null,
  }
}

export interface PaymentIntentFactoryPaymentIntent {
  id: string
  amount: number
  clientSecret: string | null
  paymentMethodId: string | null
  status: Stripe.PaymentIntent.Status
}

export const paymentIntentFactory = ({
  stripePaymentIntent,
}: {
  stripePaymentIntent: Stripe.PaymentIntent
}): PaymentIntentFactoryPaymentIntent => {
  stripePaymentIntent
  return {
    id: stripePaymentIntent.id,
    amount: stripePaymentIntent.amount,
    clientSecret: stripePaymentIntent.client_secret,
    paymentMethodId:
      typeof stripePaymentIntent.payment_method === 'string'
        ? stripePaymentIntent.payment_method
        : null,
    status: stripePaymentIntent.status,
  }
}

export interface PaymentMethodFactoryPaymentMethod {
  id: string
  type: string
  card?: {
    brand: string | null
    last4: string | null
    expMonth: number | null
    expYear: number | null
  }
  billingDetails?: {
    name: string | null
    email: string | null
    phone: string | null
    city: string | null
    country: string | null
    line1: string | null
    line2: string | null
    postalCode: string | null
    state: string | null
  }
}

export const paymentMethodFactory = ({
  stripePaymentMethod,
}: {
  stripePaymentMethod: Stripe.PaymentMethod
}): PaymentMethodFactoryPaymentMethod => {
  stripePaymentMethod
  return {
    id: stripePaymentMethod.id,
    type: stripePaymentMethod.type,
    card: {
      brand: stripePaymentMethod.card?.brand || null,
      last4: stripePaymentMethod.card?.last4 || null,
      expMonth: stripePaymentMethod.card?.exp_month || null,
      expYear: stripePaymentMethod.card?.exp_year || null,
    },
    billingDetails: {
      name: stripePaymentMethod.billing_details?.name || null,
      email: stripePaymentMethod.billing_details?.email || null,
      phone: stripePaymentMethod.billing_details?.phone || null,
      city: stripePaymentMethod.billing_details?.address?.city || null,
      country: stripePaymentMethod.billing_details?.address?.country || null,
      line1: stripePaymentMethod.billing_details?.address?.line1 || null,
      line2: stripePaymentMethod.billing_details?.address?.line2 || null,
      postalCode:
        stripePaymentMethod.billing_details?.address?.postal_code || null,
      state: stripePaymentMethod.billing_details?.address?.state || null,
    },
  }
}
