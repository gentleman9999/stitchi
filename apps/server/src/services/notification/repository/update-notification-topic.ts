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
]).concat(
  yup.object().shape({
    id: yup.string().uuid().nullable(),
  }),
)

const inputSchema = NotificationTopicRecord.concat(
  yup.object().shape({
    members: yup.array(memberInputSchema.required()).required(),
  }),
)

const prisma = new PrismaClient()

interface UpdateNotificationTopicConfig {
  notificationTable: NotificationTopicTable
}

export interface UpdateNotificationTopicFnInput {
  notificationTopic: yup.InferType<typeof inputSchema>
}

type UpdateNotificationTopicFn = (
  input: UpdateNotificationTopicFnInput,
) => Promise<NotificationFactoryNotificationTopic>

type MakeUpdateNotificationTopicFn = (
  config?: UpdateNotificationTopicConfig,
) => UpdateNotificationTopicFn

const makeUpdateNotificationTopic: MakeUpdateNotificationTopicFn =
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

    let existingNotificationTopic

    try {
      existingNotificationTopic = await notificationTable.findUnique({
        where: {
          topicKey: validInput.topicKey,
        },
        include: {
          notificationTopicMembers: true,
        },
      })

      if (!existingNotificationTopic) {
        throw new Error('Failed to find notification topic')
      }
    } catch (error) {
      logger.error(error)
      throw new Error('Failed to find notification topic')
    }

    const membersToCreate = validInput.members.filter(member => !member.id)
    const membersToUpdate = validInput.members.filter(member => member.id)

    const membersToDelete =
      existingNotificationTopic.notificationTopicMembers.filter(
        member => !membersToUpdate.find(m => m.id === member.id),
      )

    let notification

    try {
      notification = await notificationTable.update({
        where: {
          id: existingNotificationTopic.id,
        },
        data: {
          topicKey: validInput.topicKey,
          notificationTopicMembers: {
            create: membersToCreate.map(member => ({
              membershipId: member.membershipId,
            })),
            delete: membersToDelete.map(member => ({
              id: member.id,
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

export { makeUpdateNotificationTopic }
