import { enumType, interfaceType, objectType } from 'nexus'

export const NotificationChannelType = enumType({
  name: 'NotificationChannelType',
  members: ['EMAIL', 'WEB'],
})

export const Notification = objectType({
  name: 'Notification',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('notificationEventGroupId')
    t.nullable.string('userId')
    t.nullable.string('organizationId')

    t.nonNull.list.field('channels', {
      type: 'NotificationChannel',
    })

    t.nonNull.DateTime('createdAt')
    t.nullable.DateTime('updatedAt')
  },
})

export const NotificationChannel = interfaceType({
  name: 'NotificationChannel',
  resolveType(notification) {
    switch (notification.channelType) {
      case 'EMAIL':
        return 'NotificationChannelEmail'
      case 'WEB':
        return 'NotificationChannelWeb'
      default:
        throw new Error(
          `Unknown notification channel channelType: ${notification.channelType}`,
        )
    }
  },
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.field('channelType', { type: 'NotificationChannelType' })
  },
})

export const NotificationChannelEmail = objectType({
  name: 'NotificationChannelEmail',
  definition(t) {
    t.implements('NotificationChannel')

    t.nonNull.string('subject')
    t.nonNull.string('htmlBody')
    t.nullable.string('textBody')
    t.nonNull.string('recipientEmail')
    t.nullable.string('recipientName')
  },
})

export const NotificationChannelWeb = objectType({
  name: 'NotificationChannelWeb',
  definition(t) {
    t.implements('NotificationChannel')

    t.nonNull.string('message')

    t.nullable.string('ctaLabel')
    t.nullable.string('ctaUrl')
  },
})
