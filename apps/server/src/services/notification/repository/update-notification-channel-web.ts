import {
  NotificationChannelWeb,
  NotificationChannelWebTable,
  table as makeNotificationChannelWebTable,
} from '../db/notification-channel-web-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'

import { logger } from '../../../telemetry'
import {
  notificationFactoryNotificationChannelWeb,
  NotificationFactoryNotificationChannelWeb,
} from '../factory/notification-channel-web'

const inputSchema = NotificationChannelWeb.omit([
  'ctaText',
  'ctaUrl',
  'message',
])

const prisma = new PrismaClient()

interface UpdateNotificationChannelWebConfig {
  notificationChannelWebTable: NotificationChannelWebTable
}

export interface UpdateNotificationChannelWebFnInput {
  notificationChannelWeb: yup.InferType<typeof inputSchema>
}

type UpdateNotificationChannelWebFn = (
  input: UpdateNotificationChannelWebFnInput,
) => Promise<NotificationFactoryNotificationChannelWeb>

type MakeUpdateNotificationChannelWebFn = (
  config?: UpdateNotificationChannelWebConfig,
) => UpdateNotificationChannelWebFn

const makeUpdateNotificationChannelWeb: MakeUpdateNotificationChannelWebFn =
  (
    { notificationChannelWebTable } = {
      notificationChannelWebTable: makeNotificationChannelWebTable(prisma),
    },
  ) =>
  async input => {
    let validInput

    try {
      validInput = await inputSchema.validate(input.notificationChannelWeb)
    } catch (error) {
      logger.child({ error }).error('Failed to validate input')

      throw new Error('Failed to validate input')
    }

    let existingNotificationChannelWeb

    try {
      existingNotificationChannelWeb =
        await notificationChannelWebTable.findUnique({
          where: {
            id: validInput.id,
          },
        })

      if (!existingNotificationChannelWeb) {
        throw new Error('Failed to find notification channelWeb')
      }
    } catch (error) {
      logger.error(error)
      throw new Error('Failed to find notification channelWeb')
    }

    let notification

    try {
      notification = await notificationChannelWebTable.update({
        where: {
          id: existingNotificationChannelWeb.id,
        },
        data: {
          seenAt: validInput.seenAt,
        },
      })
    } catch (error) {
      logger.child({ error }).error('Failed to update notification channelWeb')

      throw new Error('Failed to create notification')
    }

    return notificationFactoryNotificationChannelWeb({
      notificationChannelWebRecord: notification,
    })
  }

export { makeUpdateNotificationChannelWeb }
