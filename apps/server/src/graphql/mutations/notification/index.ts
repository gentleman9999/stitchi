import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { notificationFactoryNotificationToGraphql } from '../../serializers/notification'

export const NotificationMarkAsSeenPayload = objectType({
  name: 'NotificationMarkAsSeenPayload',
  definition(t) {
    t.field('notification', { type: 'Notification' })
  },
})

export const NotificationMarkAsSeenInput = inputObjectType({
  name: 'NotificationMarkAsSeenInput',
  definition(t) {
    t.nonNull.id('notificationId')
  },
})

export const notificationMarkAsSeen = mutationField('notificationMarkAsSeen', {
  type: 'NotificationMarkAsSeenPayload',
  args: {
    input: nonNull('NotificationMarkAsSeenInput'),
  },
  async resolve(_root, { input }, context) {
    const { notificationId } = input

    let notification

    try {
      notification = await context.notification.markNotifificationAsSeen({
        notificationId,
      })
    } catch (error) {
      throw new GraphQLError('Failed to mark notification as seen')
    }

    return {
      notification: notificationFactoryNotificationToGraphql(notification),
    }
  },
})
