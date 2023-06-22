import { objectType } from 'nexus'

export const DesignRequestProof = objectType({
  name: 'DesignRequestProof',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('designRequestId')
    t.nonNull.id('artistUserId')
    t.nonNull.list.nonNull.id('fileIds')
    t.nullable.string('artistNote')

    t.nonNull.DateTime('createdAt')
  },
})
