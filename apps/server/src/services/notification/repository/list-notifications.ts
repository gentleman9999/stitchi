import { Prisma, PrismaClient } from '@prisma/client'
import { NotificationTable } from '../db/notification-table'
import {
  NotificationFactoryNotification,
  notificationFactory,
} from '../factory/notification'

const prisma = new PrismaClient()

interface ListNotificationsConfig {
  notificationTable: NotificationTable
}

export interface ListNotificationsFnInput
  extends Omit<Prisma.NotificationFindManyArgs, 'include' | 'select'> {}

type ListNotificationsFn = (
  input: ListNotificationsFnInput,
) => Promise<NotificationFactoryNotification[]>

type MakeListNotificationsFn = (
  config?: ListNotificationsConfig,
) => ListNotificationsFn

const makeListNotifications: MakeListNotificationsFn =
  (
    { notificationTable } = {
      notificationTable: prisma.notification,
    },
  ) =>
  async input => {
    let notificationRecords

    try {
      notificationRecords = await notificationTable.findMany({
        ...input,
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
    } catch (error) {
      console.error(`Failed to list notifications`, {
        context: { error },
      })
      throw new Error('Failed to list notifications')
    }

    return notificationRecords.map(notification =>
      notificationFactory({
        notificationRecord: notification,
        channels: notification.notificationChannels,
      }),
    )
  }

export { makeListNotifications }
