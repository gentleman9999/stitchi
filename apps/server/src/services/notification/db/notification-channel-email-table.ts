import {
  PrismaClient,
  NotificationChannelEmail as NotificationChannelEmailSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const NotificationChannelEmail: yup.ObjectSchema<NotificationChannelEmailSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),

      subject: yup.string().required(),
      htmlBody: yup.string().required(),
      textBody: yup.string().nullable().defined(),

      recipientEmail: yup.string().email().required(),
      recipientName: yup.string().nullable().defined(),
    })
    .label('Notification Channel Email')

export type NotificationChannelEmailRecord = yup.Asserts<
  typeof NotificationChannelEmail
>

export const table = (db: PrismaClient) => db.notificationChannelEmail
export type NotificationChannelEmailTable = ReturnType<typeof table>
