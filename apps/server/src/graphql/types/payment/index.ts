import { objectType } from 'nexus'

export const PaymentIntent = objectType({
  name: 'PaymentIntent',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.int('amount')
    t.nullable.string('clientSecret')
  },
})

export const PaymentMethodCard = objectType({
  name: 'PaymentMethodCard',
  definition(t) {
    t.nullable.string('brand')
    t.nullable.string('last4')
    t.nullable.int('expMonth')
    t.nullable.int('expYear')
  },
})

export const PaymentMethodBillingDetails = objectType({
  name: 'PaymentMethodBillingDetails',
  definition(t) {
    t.nullable.string('name')
    t.nullable.string('email')
    t.nullable.string('phone')
    t.nullable.string('city')
    t.nullable.string('country')
    t.nullable.string('line1')
    t.nullable.string('line2')
    t.nullable.string('postalCode')
    t.nullable.string('state')
  },
})

export const PaymentMethod = objectType({
  name: 'PaymentMethod',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('type')
    t.nullable.field('card', {
      type: PaymentMethodCard,
    })
    t.nullable.field('billingDetails', {
      type: PaymentMethodBillingDetails,
    })
  },
})
