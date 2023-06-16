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

    t.nonNull.field('status', { type: 'DesignRequestStatus' })

    t.nonNull.DateTime('createdAt')
    t.nullable.DateTime('updatedAt')
  },
})
