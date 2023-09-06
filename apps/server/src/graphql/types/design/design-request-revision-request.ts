import { objectType } from 'nexus'

export const DesignRequestRevisionRequest = objectType({
  name: 'DesignRequestRevisionRequest',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('membershipId')
    t.nonNull.id('designRequestId')
    t.nonNull.list.nonNull.id('fileIds')

    t.nonNull.string('description')

    t.nonNull.DateTime('createdAt')
  },
})
