import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import { notificationFactoryNotificationToGraphql } from '../../serializers/notification'
import { cursorPaginationFromList } from '../../utils'

export const NotificationExtendsMembership = extendType({
  type: 'Membership',
  definition(t) {
    t.nonNull.int('unseenWebNotificationsCount', {
      resolve: async (_, __, ctx) => {
        if (!ctx.membershipId) {
          throw new GraphQLError('Unauthorized')
        }

        let count

        try {
          count = await ctx.notification.listNotificationsCount({
            where: {
              membershipId: ctx.membershipId,
              notificationChannels: {
                some: {
                  web: {
                    seenAt: null,
                  },
                },
              },
            },
          })
        } catch (error) {
          throw new GraphQLError('Error listing notifications')
        }

        return count
      },
    }),
      t.connectionField('notifications', {
        type: 'Notification',
        resolve: async (
          membership,
          { first, last, after, before },
          { notification, userId, organizationId, logger, user },
        ) => {
          if (!userId || !organizationId) {
            throw new GraphQLError('Unauthorized')
          }

          const where = {
            membershipId: membership.id,
          }

          const totalNotificationsCount =
            await notification.listNotificationsCount({
              where,
            })

          const result = await cursorPaginationFromList(
            async ({ cursor, skip, take }) => {
              let notifications

              try {
                notifications = await notification.listNotifications({
                  cursor,
                  where,
                  skip,
                  take,
                  orderBy: {
                    createdAt: 'desc',
                  },
                })
              } catch (error) {
                logger
                  .child({ context: { error } })
                  .error('Error listing notifications')

                throw new GraphQLError('Error listing notifications')
              }

              return notifications.map(notificationFactoryNotificationToGraphql)
            },

            async () => totalNotificationsCount,
            { first, last, after, before },
          )

          return result
        },
      })
  },
})
