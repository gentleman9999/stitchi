import {
  PrismaClient,
  NotificationChannelSms as NotificationChannelSmsSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const NotificationChannelSms: yup.ObjectSchema<NotificationChannelSmsSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      message: yup.string().required(),
    })
    .label('Notification Channel SMS')

export type NotificationChannelSmsRecord = yup.Asserts<
  typeof NotificationChannelSms
>

export const table = (db: PrismaClient) => db.notificationChannelSms
export type NotificationChannelSmsTable = ReturnType<typeof table>
