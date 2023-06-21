import { enumType, objectType, unionType } from 'nexus'

export const DesignRequestHistoryItemDesignRequestEventMethod = enumType({
  name: 'DesignRequestHistoryItemDesignRequestEventMethod',
  members: ['CREATE'],
})

export const DesignRequestHistoryItemDesignRequestEvent = objectType({
  name: 'DesignRequestHistoryItemDesignRequestEvent',
  definition(t) {
    t.nonNull.id('id')
    t.nullable.id('userId')
    t.nonNull.field('method', {
      type: 'DesignRequestHistoryItemDesignRequestEventMethod',
    })
    t.nonNull.DateTime('timestamp')
  },
})

export const DesignRequestHistoryItem = unionType({
  name: 'DesignRequestHistoryItem',
  definition(t) {
    t.members(
      'ConversationMessage',
      'DesignRequestHistoryItemDesignRequestEvent',
    )
  },
  resolveType(item) {
    if ('conversationId' in item) {
      return 'ConversationMessage'
    }

    if ('method' in item) {
      return 'DesignRequestHistoryItemDesignRequestEvent'
    }

    return null
  },
})

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
    t.nullable.id('userId')
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
