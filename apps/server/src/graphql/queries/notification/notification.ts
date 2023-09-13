import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import { cursorPaginationFromList } from '../../utils'

export const NotificationExtendsMembership = extendType({
  type: 'Membership',
  definition(t) {
    t.connectionField('notifications', {
      type: 'Notification',
      resolve: async (
        membership,
        { first, last, after, before },
        { notification, userId, organizationId },
      ) => {
        if (!userId || !organizationId) {
          throw new GraphQLError('Unauthorized')
        }

        const where = {
          membershipId: membership.id,
        }

        const totalNotifications = await notification.listNotificationsCount({
          where,
        })

        return cursorPaginationFromList(
          async ({ cursor, skip, take }) =>
            await notification.listNotifications({
              cursor,
              where,
              skip,
              take,
              orderBy: {
                createdAt: 'desc',
              },
            }),
          async () => totalNotifications,
          { first, last, after, before },
        )
      },
    })
  },
})
