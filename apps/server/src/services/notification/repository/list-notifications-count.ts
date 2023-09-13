import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { NotificationTable } from '../db/notification-table'

const prisma = new PrismaClient()

interface ListNotificationsCountConfig {
  notificationTable: NotificationTable
}

export interface ListNotificationsCountFnInput
  extends Prisma.NotificationCountArgs {}

type ListNotificationsCountFn = (
  input: ListNotificationsCountFnInput,
) => Promise<number>

type MakeListNotificationsCountFn = (
  config?: ListNotificationsCountConfig,
) => ListNotificationsCountFn

const makeListNotificationsCount: MakeListNotificationsCountFn =
  (
    { notificationTable } = {
      notificationTable: prisma.notification,
    },
  ) =>
  async input => {
    let notificationCount

    try {
      notificationCount = await notificationTable.count({
        ...input,
      })
    } catch (error) {
      logger
        .child({
          context: { error },
        })
        .error(`Failed to list notifications`)
      throw new Error('Failed to list notifications')
    }

    return notificationCount
  }

export { makeListNotificationsCount }
