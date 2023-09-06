import {
  Notification,
  NotificationTable,
  table as makeNotificationTable,
} from '../db/notification-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  notificationFactoryNotification,
  NotificationFactoryNotification,
} from '../factory/notification'
import { NotificationChannelEmail } from '../db/notification-channel-email-table'
import { NotificationChannelWeb } from '../db/notification-channel-web-table'
import {
  NotificationChannel,
  NotificationChannelType,
} from '../db/notification-channel-table'
import { logger } from '../../../telemetry'

const emailNotificationSchema = NotificationChannel.omit([
  'id',
  'channelType',
  'channelId',
  'notificationId',
])
  .concat(NotificationChannelEmail.omit(['id']))
  .concat(
    yup.object().shape({
      channelType: yup
        .mixed<NotificationChannelType.EMAIL>()
        .oneOf([NotificationChannelType.EMAIL])
        .required(),
    }),
  )
  .required()

const webNotificationSchema = NotificationChannel.omit([
  'id',
  'channelType',
  'channelId',
  'notificationId',
])
  .concat(NotificationChannelWeb.omit(['id']))
  .concat(
    yup.object().shape({
      channelType: yup
        .mixed<NotificationChannelType.WEB>()
        .oneOf([NotificationChannelType.WEB])
        .required(),
    }),
  )
  .required()

type NotificationChannelSchemaType =
  | yup.InferType<typeof emailNotificationSchema>
  | yup.InferType<typeof webNotificationSchema>

const channelInputSchema = yup
  .mixed<NotificationChannelSchemaType>()
  .test(
    'dynamic object validation',
    'dynamic object validation error',
    object => {
      switch (object?.channelType) {
        case NotificationChannelType.EMAIL:
          return emailNotificationSchema.isValidSync(object)
        case NotificationChannelType.WEB:
          return webNotificationSchema.isValidSync(object)
        default:
          false
      }
    },
  )

export type CreateNotificationChannelInput = yup.InferType<
  typeof channelInputSchema
>

const inputSchema = Notification.omit(['id', 'createdAt', 'updatedAt']).concat(
  yup.object().shape({
    channels: yup.array().of(channelInputSchema.required()).required(),
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
    let validInput

    try {
      validInput = await inputSchema.validate(input.notification)
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
          membershipId: validInput.membershipId,
          organizationId: validInput.organizationId,
          notificationWorkflowId: validInput.notificationWorkflowId,
          notificationTopicId: validInput.notificationTopicId,
          notificationChannels: {
            create: validInput.channels.map(channel => ({
              channelType: channel.channelType,
              ...(channel.channelType === NotificationChannelType.EMAIL
                ? {
                    email: {
                      create: {
                        subject: channel.subject,
                        htmlBody: channel.htmlBody,
                        textBody: channel.textBody,
                        recipientName: channel.recipientName,
                        recipientEmail: channel.recipientEmail,
                      },
                    },
                  }
                : {}),
              ...(channel.channelType === NotificationChannelType.WEB
                ? {
                    web: {
                      create: {
                        message: channel.message,
                      },
                    },
                  }
                : {}),
            })),
          },
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
    } catch (error) {
      logger.error(error)
      throw new Error('Failed to create notification')
    }

    return notificationFactoryNotification({
      notificationRecord: notification,
      channels: notification.notificationChannels,
    })
  }

export { makeCreateNotification }
