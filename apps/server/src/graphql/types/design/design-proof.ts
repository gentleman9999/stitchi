import { objectType } from 'nexus'

export const DesignProof = objectType({
  name: 'DesignProof',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('artistUserId')

    t.nullable.id('primaryImageFileId')

    t.nonNull.DateTime('createdAt')

    t.nonNull.list.nonNull.id('designProofLocationIds')
    t.nonNull.list.nonNull.field('locations', {
      type: 'DesignProofLocation',
    })

    t.nonNull.list.nonNull.id('designProofColorIds')
    t.nonNull.list.nonNull.field('colors', {
      type: 'DesignProofColor',
    })
  },
})
