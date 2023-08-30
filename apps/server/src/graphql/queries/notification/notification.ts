import { GraphQLError } from 'graphql'
import { connectionFromArray } from 'graphql-relay'
import { extendType } from 'nexus'
import { notEmpty } from '../../../utils'
import { notificationFactoryNotificationToGraphql } from '../../serializers/notification'

export const NotificationExtendsMembership = extendType({
  type: 'Membership',
  definition(t) {
    t.connectionField('notifications', {
      type: 'Notification',
      resolve: async (
        _,
        { first, last, after, before },
        { notification, userId, organizationId },
      ) => {
        if (!userId || !organizationId) {
          throw new GraphQLError('Unauthorized')
        }

        let limit = 50

        let cursor
        let cursorDirection

        if (after) {
          cursor = { id: after } // decode from base64 or use it as-is depending on your implementation
          cursorDirection = 'after'
          if (notEmpty(first)) {
            limit = first
          }
        } else if (before) {
          cursor = { id: before }
          cursorDirection = 'before'
          if (notEmpty(last)) {
            limit = last
          }
        }

        // Add one to see if there's a next page
        const limitPlusOne = limit + 1

        const notifications = await notification.listNotifications({
          cursor,
          skip: cursor ? 1 : 0,
          take: cursorDirection === 'after' ? limitPlusOne : -limitPlusOne,
          where: {
            userId,
            organizationId,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })

        const connection = connectionFromArray(
          notifications.map(notificationFactoryNotificationToGraphql),
          {
            first,
            last,
            after,
            before,
          },
        )

        return connection
      },
    })
  },
})
