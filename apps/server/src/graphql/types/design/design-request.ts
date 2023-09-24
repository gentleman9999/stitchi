import { enumType, objectType, unionType } from 'nexus'

export const DesignRequestHistoryItemDesignRequestEventMethod = enumType({
  name: 'DesignRequestHistoryItemDesignRequestEventMethod',
  members: ['CREATE'],
})

export const DesignRequestHistoryItemDesignRequestEvent = objectType({
  name: 'DesignRequestHistoryItemDesignRequestEvent',
  definition(t) {
    t.nonNull.id('id')
    t.nullable.id('membershipId')
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
      'DesignProof',
      'DesignRequestRevisionRequest',
    )
  },
  resolveType(item) {
    if ('conversationId' in item) {
      return 'ConversationMessage'
    }

    if ('method' in item) {
      return 'DesignRequestHistoryItemDesignRequestEvent'
    }

    if ('artistMembershipId' in item) {
      return 'DesignProof'
    }

    if ('description' in item && 'fileIds' in item) {
      return 'DesignRequestRevisionRequest'
    }

    throw new Error('Could not resolve type')
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
    t.nullable.id('membershipId')
    t.nullable.id('conversationId')
    t.nullable.id('approvedDesignProofId')
    t.nonNull.string('name')
    t.nullable.string('description')
    t.nullable.string('useCase')

    t.nonNull.string('fileUploadDirectory', {
      resolve: root => {
        return `design-requests/${root.id}`
      },
    })

    t.nonNull.field('status', { type: 'DesignRequestStatus' })
    t.nonNull.string('humanizedStatus')

    t.nonNull.list.nonNull.id('fileIds')
    t.nonNull.list.nonNull.id('designRequestLocationIds')
    t.nonNull.list.nonNull.id('designProofIds')

    t.nonNull.list.nonNull.field('designRequestLocations', {
      type: 'DesignRequestDesignLocation',
    })

    t.nonNull.list.nonNull.id('designRevisionRequestIds')
    t.nonNull.list.nonNull.field('designRevisionRequests', {
      type: 'DesignRequestRevisionRequest',
    })
    t.nonNull.id('designRequestProductId')
    t.nonNull.field('designRequestProduct', {
      type: 'DesignRequestProduct',
    })

    t.nonNull.DateTime('createdAt')
    t.nullable.DateTime('updatedAt')

    t.nullable.field('previewImage', {
      type: 'FileImage',
    })

    t.nullable.string('previewImageUrl')
  },
})
