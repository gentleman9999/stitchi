import { objectType } from 'nexus'

export const DesignRequestRevision = objectType({
  name: 'DesignRequestRevision',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('userId')
    t.nonNull.list.nonNull.id('fileIds')

    t.nonNull.string('description')

    t.nonNull.DateTime('createdAt')
  },
})
