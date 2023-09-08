import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { NotificationTopicTable } from '../db/notification-topic-table'
import {
  NotificationFactoryNotificationTopic,
  notificationFactoryNotificationTopic,
} from '../factory/notification-topic'

const prisma = new PrismaClient()

interface ListNotificationTopicsConfig {
  notificationTopicTable: NotificationTopicTable
}

export interface ListNotificationTopicsFnInput
  extends Omit<Prisma.NotificationTopicFindManyArgs, 'include' | 'select'> {}

type ListNotificationTopicsFn = (
  input: ListNotificationTopicsFnInput,
) => Promise<NotificationFactoryNotificationTopic[]>

type MakeListNotificationTopicsFn = (
  config?: ListNotificationTopicsConfig,
) => ListNotificationTopicsFn

const makeListNotificationTopics: MakeListNotificationTopicsFn =
  (
    { notificationTopicTable } = {
      notificationTopicTable: prisma.notificationTopic,
    },
  ) =>
  async input => {
    let notificationTopicRecords

    try {
      notificationTopicRecords = await notificationTopicTable.findMany({
        ...input,
        include: {
          notificationTopicMembers: true,
        },
      })
    } catch (error) {
      logger
        .child({
          context: { error },
        })
        .error(`Failed to list notificationTopics`)
      throw new Error('Failed to list notificationTopics')
    }

    return notificationTopicRecords.map(notificationTopic =>
      notificationFactoryNotificationTopic({
        notificationTopicRecord: notificationTopic,
        notificationTopicMemberRecords:
          notificationTopic.notificationTopicMembers,
      }),
    )
  }

export { makeListNotificationTopics }
