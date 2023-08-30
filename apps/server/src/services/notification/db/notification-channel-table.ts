import {
  PrismaClient,
  NotificationChannel as NotificationChannelSchema,
} from '@prisma/client'
import * as yup from 'yup'

export enum NotificationChannelType {
  EMAIL = 'EMAIL',
  WEB = 'WEB',
}

interface NotificationChannel
  extends Omit<NotificationChannelSchema, 'channelType'> {
  channelType: NotificationChannelType
}

export const NotificationChannel: yup.ObjectSchema<NotificationChannel> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    notificationId: yup.string().uuid().required(),
    channelId: yup.string().uuid().required(),

    channelType: yup
      .mixed<NotificationChannelType>()
      .oneOf(Object.values(NotificationChannelType))
      .required(),
  })
  .label('Notification Channel')

export type NotificationChannelRecord = yup.Asserts<typeof NotificationChannel>

export const table = (db: PrismaClient) => db.notificationChannel
export type NotificationChannelTable = ReturnType<typeof table>
