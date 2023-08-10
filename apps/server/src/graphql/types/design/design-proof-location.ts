import { objectType } from 'nexus'

export const DesignProofLocation = objectType({
  name: 'DesignProofLocation',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('designProofId')
    t.nonNull.id('fileId')

    t.nullable.string('placement')
    t.nullable.int('colorCount')
  },
})
