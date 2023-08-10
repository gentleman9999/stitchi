import { objectType } from 'nexus'

export const DesignRequestDesignLocation = objectType({
  name: 'DesignRequestDesignLocation',
  definition(t) {
    t.nonNull.id('id')
    t.nullable.string('description')
    t.nullable.string('placement')
    t.nonNull.string('fileUploadDirectory', {
      resolve: root => {
        return `design-requests/${root.id}`
      },
    })
    t.nonNull.list.nonNull.id('fileIds')
  },
})
