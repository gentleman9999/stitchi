import {
  NotificationEventGroup,
  NotificationEventGroupTable,
  table as makeNotificationEventGroupTable,
} from '../db/notification-event-group-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  notificationEventGroupFactory,
  NotificationFactoryNotificationEventGroup,
} from '../factory/notification-event-group'
import { notificationFactory } from '../factory/notification'

const inputSchema = NotificationEventGroup.omit([
  'id',
  'createdAt',
  'updatedAt',
]).concat(yup.object().shape({}))

const prisma = new PrismaClient()

interface CreateNotificationEventGroupConfig {
  notificationEventGroupTable: NotificationEventGroupTable
}

export interface CreateNotificationEventGroupFnInput {
  notificationEventGroup: yup.InferType<typeof inputSchema>
}

type CreateNotificationEventGroupFn = (
  input: CreateNotificationEventGroupFnInput,
) => Promise<NotificationFactoryNotificationEventGroup>

type MakeCreateNotificationEventGroupFn = (
  config?: CreateNotificationEventGroupConfig,
) => CreateNotificationEventGroupFn

const makeCreateNotificationEventGroup: MakeCreateNotificationEventGroupFn =
  (
    { notificationEventGroupTable } = {
      notificationEventGroupTable: makeNotificationEventGroupTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.notificationEventGroup)

    let notificationEventGroup

    try {
      notificationEventGroup = await notificationEventGroupTable.create({
        data: {
          resourceId: validInput.resourceId,
          resource: validInput.resource,
          eventKey: validInput.eventKey,
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
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create notificationEventGroup')
    }

    const notifications = notificationEventGroup.notifications.map(
      notification =>
        notificationFactory({
          notificationRecord: notification,
          channels: notification.notificationChannels,
        }),
    )

    return notificationEventGroupFactory({
      notifications,
      notificationEventGroupRecord: notificationEventGroup,
    })
  }

export { makeCreateNotificationEventGroup }
