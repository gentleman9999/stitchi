import { objectType } from 'nexus'

export const DesignProof = objectType({
  name: 'DesignProof',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('artistUserId')

    t.nullable.id('primaryImageFileId')

    t.nonNull.list.nonNull.field('locations', {
      type: 'DesignProofLocation',
    })

    t.nonNull.DateTime('createdAt')
  },
})
