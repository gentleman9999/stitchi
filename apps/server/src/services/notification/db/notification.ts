import {
  PrismaClient,
  Notification as NotificationSchema,
} from '@prisma/client'
import * as yup from 'yup'

export enum NotificationRecordType {
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
}

export enum NotificationRecordSendStatus {
  NOT_SENT = 'NOT_SENT',
  SENT = 'SENT',
}

export const Notification: yup.ObjectSchema<NotificationSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    userId: yup.string().nullable().defined(),
    organizationId: yup.string().uuid().nullable().defined(),
    notificationEmailId: yup.string().uuid().nullable().defined(),
    type: yup
      .mixed<NotificationRecordType>()
      .oneOf(Object.values(NotificationRecordType))
      .required(),
    sendStatus: yup
      .mixed<NotificationRecordSendStatus>()
      .oneOf(Object.values(NotificationRecordSendStatus))
      .required(),

    sendAt: yup.date().optional().defined(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('Notification')

export type NotificationRecord = yup.Asserts<typeof Notification>

export const table = (db: PrismaClient) => db.notification
export type NotificationTable = ReturnType<typeof table>
