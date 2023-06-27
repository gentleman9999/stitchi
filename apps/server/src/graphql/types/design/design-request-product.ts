import { objectType } from 'nexus'

export const DesignRequestProduct = objectType({
  name: 'DesignRequestProduct',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('bigCommerceProductId')
  },
})
