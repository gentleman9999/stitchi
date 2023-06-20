import { enumType, objectType } from 'nexus'

export const DesignRequestStatus = enumType({
  name: 'DesignRequestStatus',
  members: [
    'DRAFT',
    'SUBMITTED',
    'APPROVED',
    'REJECTED',
    'AWAITING_APPROVAL',
    'AWAITING_REVISION',
  ],
})

export const DesignRequest = objectType({
  name: 'DesignRequest',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nullable.string('description')
    t.nullable.string('useCase')

    t.nonNull.string('fileUploadDirectory', {
      resolve: root => {
        return `design-requests/${root.id}`
      },
    })

    t.nonNull.field('status', { type: 'DesignRequestStatus' })

    t.nonNull.list.nonNull.id('fileIds')
    t.nonNull.list.nonNull.id('designLocationIds')
    t.nonNull.list.nonNull.field('designLocations', {
      type: 'DesignRequestDesignLocation',
    })

    t.nonNull.DateTime('createdAt')
    t.nullable.DateTime('updatedAt')
  },
})
