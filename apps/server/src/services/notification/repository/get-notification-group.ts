import { PrismaClient } from '@prisma/client'
import { NotificationEventGroupTable } from '../db/notification-event-group-table'
import { notificationFactory } from '../factory/notification'
import {
  NotificationFactoryNotificationEventGroup,
  notificationEventGroupFactory,
} from '../factory/notification-event-group'

const primsa = new PrismaClient()

interface GetNotificationEventGroupConfig {
  notificationEventGroupTable: NotificationEventGroupTable
}

export interface GetNotificationEventGroupFnInput {
  notificationEventGroupId: string
}

type GetNotificationEventGroupFn = (
  input: GetNotificationEventGroupFnInput,
) => Promise<NotificationFactoryNotificationEventGroup>

type MakeGetNotificationEventGroupFn = (
  config?: GetNotificationEventGroupConfig,
) => GetNotificationEventGroupFn

const makeGetNotificationEventGroup: MakeGetNotificationEventGroupFn =
  (
    { notificationEventGroupTable } = {
      notificationEventGroupTable: primsa.notificationEventGroup,
    },
  ) =>
  async input => {
    const notificationEventGroup = await notificationEventGroupTable.findFirst({
      where: {
        id: input.notificationEventGroupId,
      },
      include: {
        notifications: {
          include: {
            notificationChannels: {
              include: {
                email: true,
                web: true,
              },
            },
          },
        },
      },
    })

    if (!notificationEventGroup) {
      throw new Error(`NotificationEventGroup not found: ${input}`)
    }

    const notifications = notificationEventGroup.notifications.map(
      notification =>
        notificationFactory({
          channels: notification.notificationChannels,
          notificationRecord: notification,
        }),
    )

    return notificationEventGroupFactory({
      notifications,
      notificationEventGroupRecord: notificationEventGroup,
    })
  }

export { makeGetNotificationEventGroup }
