import { PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { NotificationTable } from '../db/notification-table'
import {
  NotificationFactoryNotification,
  notificationFactoryNotification,
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
    let notification

    try {
      notification = await notificationTable.findFirst({
        where: {
          id: input.notificationId,
        },
        include: {
          notificationChannels: {
            include: {
              email: true,
              web: true,
            },
          },
        },
      })

      if (!notification) {
        throw new Error(`Notification not found: ${input}`)
      }
    } catch (error) {
      logger.child({ error, input }).error('Failed to get notification')

      throw new Error('Failed to get notification')
    }

    return notificationFactoryNotification({
      notificationRecord: notification,
      channels: notification.notificationChannels,
    })
  }

export { makeGetNotification }
