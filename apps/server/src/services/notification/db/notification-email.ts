import {
  PrismaClient,
  NotificationEmail as NotificationEmailSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const NotificationEmail: yup.ObjectSchema<NotificationEmailSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    subject: yup.string().required(),
    htmlBody: yup.string().required(),
    textBody: yup.string().nullable().defined(),
    recipientEmail: yup.string().email().required(),
    recipientName: yup.string().nullable().defined(),
  })
  .label('Email Notification')

export type NotificationEmailRecord = yup.Asserts<typeof NotificationEmail>

export const table = (db: PrismaClient) => db.notificationEmail
export type NotificationEmailTable = ReturnType<typeof table>
