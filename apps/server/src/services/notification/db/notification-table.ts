import {
  PrismaClient,
  Notification as NotificationSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const Notification: yup.ObjectSchema<NotificationSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    notificationWorkflowId: yup.string().uuid().required(),
    membershipId: yup.string().nullable().defined(),
    notificationTopicId: yup.string().uuid().nullable().defined(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('Notification')

export type NotificationRecord = yup.Asserts<typeof Notification>

export const table = (db: PrismaClient) => db.notification
export type NotificationTable = ReturnType<typeof table>
