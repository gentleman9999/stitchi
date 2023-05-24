import { objectType } from 'nexus'

export const PaymentIntent = objectType({
  name: 'PaymentIntent',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.int('amount')
    t.nullable.string('clientSecret')
  },
})
