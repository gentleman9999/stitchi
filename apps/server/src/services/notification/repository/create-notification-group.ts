import {
  NotificationGroup,
  NotificationGroupTable,
  table as makeNotificationGroupTable,
} from '../db/notification-group-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  notificationGroupFactory,
  NotificationFactoryNotificationGroup,
} from '../factory/notification-group'
import { notificationFactory } from '../factory/notification'

const inputSchema = NotificationGroup.omit([
  'id',
  'createdAt',
  'updatedAt',
]).concat(yup.object().shape({}))

const prisma = new PrismaClient()

interface CreateNotificationGroupConfig {
  notificationGroupTable: NotificationGroupTable
}

export interface CreateNotificationGroupFnInput {
  notificationGroup: yup.InferType<typeof inputSchema>
}

type CreateNotificationGroupFn = (
  input: CreateNotificationGroupFnInput,
) => Promise<NotificationFactoryNotificationGroup>

type MakeCreateNotificationGroupFn = (
  config?: CreateNotificationGroupConfig,
) => CreateNotificationGroupFn

const makeCreateNotificationGroup: MakeCreateNotificationGroupFn =
  (
    { notificationGroupTable } = {
      notificationGroupTable: makeNotificationGroupTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.notificationGroup)

    let notificationGroup

    try {
      notificationGroup = await notificationGroupTable.create({
        data: {
          type: validInput.type,
        },
        include: {
          notifications: {
            include: {
              notificationChannels: {
                include: {
                  email: true,
                  web: true,
                  sms: true,
                },
              },
            },
          },
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create notificationGroup')
    }

    const notifications = notificationGroup.notifications.map(notification =>
      notificationFactory({
        notificationRecord: notification,
        channels: notification.notificationChannels,
      }),
    )

    return notificationGroupFactory({
      notifications,
      notificationGroupRecord: notificationGroup,
    })
  }

export { makeCreateNotificationGroup }
