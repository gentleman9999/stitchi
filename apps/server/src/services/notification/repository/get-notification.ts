import { PrismaClient } from '@prisma/client'
import { NotificationTable } from '../db/notification-table'
import {
  NotificationFactoryNotification,
  notificationFactory,
} from '../factory/notification'

const primsa = new PrismaClient()

interface GetNotificationConfig {
  notificationTable: NotificationTable
}

export interface GetNotificationFnInput {
  notificationId: string
}

type GetNotificationFn = (
  input: GetNotificationFnInput,
) => Promise<NotificationFactoryNotification>

type MakeGetNotificationFn = (
  config?: GetNotificationConfig,
) => GetNotificationFn

const makeGetNotification: MakeGetNotificationFn =
  ({ notificationTable } = { notificationTable: primsa.notification }) =>
  async input => {
    const notification = await notificationTable.findFirst({
      where: {
        id: input.notificationId,
      },
      include: {
        notificationChannels: {
          include: {
            email: true,
            sms: true,
            web: true,
          },
        },
      },
    })

    if (!notification) {
      throw new Error(`Notification not found: ${input}`)
    }

    return notificationFactory({
      notificationRecord: notification,
      channels: notification.notificationChannels,
    })
  }

export { makeGetNotification }
