import { objectType } from 'nexus'

export const DesignProductSize = objectType({
  name: 'DesignProductSize',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
  },
})
