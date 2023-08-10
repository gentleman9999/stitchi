import { objectType } from 'nexus'

export const DesignRequestProductColors = objectType({
  name: 'DesignRequestProductColors',
  definition(t) {
    t.nullable.string('hexCode')
    t.nullable.string('name')
    t.nonNull.id('catalogProductColorId')
  },
})

export const DesignRequestProduct = objectType({
  name: 'DesignRequestProduct',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('catalogProductId')
    t.nonNull.list.nonNull.field('colors', {
      type: 'DesignRequestProductColors',
    })
  },
})
