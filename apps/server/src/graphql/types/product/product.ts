import { objectType } from 'nexus'

export const Product = objectType({
  name: 'Product',
  definition: t => {
    t.nonNull.id('id')
  },
})

export const Variant = objectType({
  name: 'Variant',
  definition: t => {
    t.nonNull.id('id')
  },
})
