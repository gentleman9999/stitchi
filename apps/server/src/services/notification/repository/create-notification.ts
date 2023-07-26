import {
  Notification,
  NotificationTable,
  table as makeNotificationTable,
} from '../db/notification-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  notificationFactory,
  NotificationFactoryNotification,
} from '../factory/notification'
import { NotificationChannelSms } from '../db/notification-channel-sms-table'
import { NotificationChannelEmail } from '../db/notification-channel-email-table'
import { NotificationChannelWeb } from '../db/notification-channel-web-table'
import {
  NotificationChannel,
  NotificationChannelType,
} from '../db/notification-channel-table'

const smsNotificationSchema = NotificationChannel.omit([
  'id',
  'type',
  'childId',
  'notificationId',
])
  .concat(NotificationChannelSms.omit(['id']))
  .concat(
    yup.object().shape({
      type: yup
        .mixed<NotificationChannelType.SMS>()
        .oneOf([NotificationChannelType.SMS])
        .required(),
    }),
  )
  .required()

const emailNotificationSchema = NotificationChannel.omit([
  'id',
  'type',
  'childId',
  'notificationId',
])
  .concat(NotificationChannelEmail.omit(['id']))
  .concat(
    yup.object().shape({
      type: yup
        .mixed<NotificationChannelType.EMAIL>()
        .oneOf([NotificationChannelType.EMAIL])
        .required(),
    }),
  )
  .required()

const webNotificationSchema = NotificationChannel.omit([
  'id',
  'type',
  'childId',
  'notificationId',
])
  .concat(NotificationChannelWeb.omit(['id']))
  .concat(
    yup.object().shape({
      type: yup
        .mixed<NotificationChannelType.WEB>()
        .oneOf([NotificationChannelType.WEB])
        .required(),
    }),
  )
  .required()

type NotificationChannelSchemaType =
  | yup.InferType<typeof smsNotificationSchema>
  | yup.InferType<typeof emailNotificationSchema>
  | yup.InferType<typeof webNotificationSchema>

const inputSchema = Notification.omit([
  'id',
  'createdAt',
  'updatedAt',
  'sentAt',
]).concat(
  yup.object().shape({
    channels: yup
      .array()
      .of(
        yup
          .mixed<NotificationChannelSchemaType>()
          .test(
            'dynamic object validation',
            'dynamic object validation error',
            (object, context) => {
              switch (object?.type) {
                case NotificationChannelType.SMS:
                  return smsNotificationSchema.isValidSync(object)
                case NotificationChannelType.EMAIL:
                  return emailNotificationSchema.isValidSync(object)
                case NotificationChannelType.WEB:
                  return webNotificationSchema.isValidSync(object)
                default:
                  false
              }
            },
          )
          .required(),
      )
      .required(),
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

    let notification

    try {
      notification = await notificationTable.create({
        data: {
          type: validInput.type,
          userId: validInput.userId,
          organizationId: validInput.organizationId,
          notificationGroupId: validInput.notificationGroupId,
          sentAt: null,
          notificationChannels: {
            create: validInput.channels.map(channel => ({
              type: channel.type,
              ...(channel.type === NotificationChannelType.SMS
                ? {
                    sms: {
                      create: {
                        message: channel.message,
                      },
                    },
                  }
                : {}),
              ...(channel.type === NotificationChannelType.EMAIL
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
              ...(channel.type === NotificationChannelType.WEB
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
              sms: true,
              web: true,
            },
          },
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create notification')
    }

    return notificationFactory({
      notificationRecord: notification,
      channels: notification.notificationChannels,
    })
  }

export { makeCreateNotification }
