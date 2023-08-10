import { PrismaClient } from '@prisma/client'
import { NotificationGroupTable } from '../db/notification-group-table'
import { notificationFactory } from '../factory/notification'
import {
  NotificationFactoryNotificationGroup,
  notificationGroupFactory,
} from '../factory/notification-group'

const primsa = new PrismaClient()

interface GetNotificationGroupConfig {
  notificationGroupTable: NotificationGroupTable
}

export interface GetNotificationGroupFnInput {
  notificationGroupId: string
}

type GetNotificationGroupFn = (
  input: GetNotificationGroupFnInput,
) => Promise<NotificationFactoryNotificationGroup>

type MakeGetNotificationGroupFn = (
  config?: GetNotificationGroupConfig,
) => GetNotificationGroupFn

const makeGetNotificationGroup: MakeGetNotificationGroupFn =
  (
    { notificationGroupTable } = {
      notificationGroupTable: primsa.notificationGroup,
    },
  ) =>
  async input => {
    const notificationGroup = await notificationGroupTable.findFirst({
      where: {
        id: input.notificationGroupId,
      },
      include: {
        notifications: {
          include: {
            notificationChannels: {
              include: {
                email: true,
                sms: true,
                web: true,
              },
            },
          },
        },
      },
    })

    if (!notificationGroup) {
      throw new Error(`NotificationGroup not found: ${input}`)
    }

    const notifications = notificationGroup.notifications.map(notification =>
      notificationFactory({
        channels: notification.notificationChannels,
        notificationRecord: notification,
      }),
    )

    return notificationGroupFactory({
      notifications,
      notificationGroupRecord: notificationGroup,
    })
  }

export { makeGetNotificationGroup }
