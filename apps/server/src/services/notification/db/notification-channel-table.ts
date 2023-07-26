import {
  PrismaClient,
  NotificationChannel as NotificationChannelSchema,
} from '@prisma/client'
import * as yup from 'yup'

export enum NotificationChannelType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WEB = 'WEB',
}

export const NotificationChannel: yup.ObjectSchema<NotificationChannelSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      notificationId: yup.string().uuid().required(),
      childId: yup.string().uuid().required(),

      type: yup
        .mixed<NotificationChannelType>()
        .oneOf(Object.values(NotificationChannelType))
        .required(),
    })
    .label('Notification Channel')

export type NotificationChannelRecord = yup.Asserts<typeof NotificationChannel>

export const table = (db: PrismaClient) => db.notificationChannel
export type NotificationChannelTable = ReturnType<typeof table>
