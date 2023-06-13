import {
  Notification,
  NotificationTable,
  table as makeNotificationTable,
} from '../db/notification'

import * as yup from 'yup'
import { NotificationEmail } from '../db/notification-email'
import { PrismaClient } from '@prisma/client'
import {
  notificationFactory,
  NotificationFactoryNotification,
} from '../factory'

const inputSchema = Notification.omit([
  'id',
  'createdAt',
  'updatedAt',
  'notificationEmailId',
]).concat(
  yup.object().shape({
    email: NotificationEmail.omit(['id']).optional(),
  }),
)

const prisma = new PrismaClient()

interface CreateNotificationConfig {
  notificationTable: NotificationTable
}

export interface CreateNotificationFnInput {
  notification: yup.InferType<typeof inputSchema>
}

type CreateNotificationFn = (
  input: CreateNotificationFnInput,
) => Promise<NotificationFactoryNotification>

type MakeCreateNotificationFn = (
  config?: CreateNotificationConfig,
) => CreateNotificationFn

const makeCreateNotification: MakeCreateNotificationFn =
  (
    { notificationTable } = {
      notificationTable: makeNotificationTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.notification)

    const { email, ...restValidInput } = validInput

    if (!email) throw new Error('Email is required')

    let notification

    try {
      notification = await notificationTable.create({
        data: {
          ...restValidInput,
          NotificationEmail: {
            create: {
              ...email,
            },
          },
        },
        include: {
          NotificationEmail: true,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create notification')
    }

    return notificationFactory({
      notificationRecord: notification,
      notificationEmailRecord: notification.NotificationEmail,
    })
  }

export { makeCreateNotification }
