import { objectType } from 'nexus'

export const DesignProofColor = objectType({
  name: 'DesignProofColor',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('designProofId')
    t.nonNull.id('catalogProductColorId')
    t.nullable.string('hexCode')
    t.nullable.string('name')
    t.nonNull.list.nonNull.id('imageFileIds')
  },
})
