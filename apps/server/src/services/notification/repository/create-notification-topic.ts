import {
  NotificationTopicRecord,
  NotificationTopicTable,
  table as makeNotificationTopicTable,
} from '../db/notification-topic-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  notificationFactoryNotificationTopic,
  NotificationFactoryNotificationTopic,
} from '../factory/notification-topic'

import { logger } from '../../../telemetry'
import { NotificationTopicMemberRecord } from '../db/notification-topic-subscriber-table'

const memberInputSchema = NotificationTopicMemberRecord.omit([
  'id',
  'createdAt',
  'updatedAt',
  'notificationTopicId',
])

const inputSchema = NotificationTopicRecord.omit(['id']).concat(
  yup.object().shape({
    members: yup.array(memberInputSchema.required()).required(),
  }),
)

const prisma = new PrismaClient()

interface CreateNotificationTopicConfig {
  notificationTable: NotificationTopicTable
}

export interface CreateNotificationTopicFnInput {
  notificationTopic: yup.InferType<typeof inputSchema>
}

type CreateNotificationTopicFn = (
  input: CreateNotificationTopicFnInput,
) => Promise<NotificationFactoryNotificationTopic>

type MakeCreateNotificationTopicFn = (
  config?: CreateNotificationTopicConfig,
) => CreateNotificationTopicFn

const makeCreateNotificationTopic: MakeCreateNotificationTopicFn =
  (
    { notificationTable } = {
      notificationTable: makeNotificationTopicTable(prisma),
    },
  ) =>
  async input => {
    let validInput

    try {
      validInput = await inputSchema.validate(input.notificationTopic)
    } catch (error) {
      console.error(`Failed to validate input`, {
        context: { error },
      })
      throw new Error('Failed to validate input')
    }

    let notification

    try {
      notification = await notificationTable.create({
        data: {
          topicKey: validInput.topicKey,
          notificationTopicMembers: {
            create: validInput.members.map(member => ({
              membershipId: member.membershipId,
            })),
          },
        },
        include: {
          notificationTopicMembers: true,
        },
      })
    } catch (error) {
      logger.error(error)
      throw new Error('Failed to create notification')
    }

    return notificationFactoryNotificationTopic({
      notificationTopicRecord: notification,
      notificationTopicMemberRecords: notification.notificationTopicMembers,
    })
  }

export { makeCreateNotificationTopic }
