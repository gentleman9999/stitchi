import {
  PrismaClient,
  NotificationGroup as NotificationGroupSchema,
  NotificationType,
} from '@prisma/client'
import * as yup from 'yup'

export enum NotificationGroupType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WEB = 'WEB',
}

export const NotificationGroup: yup.ObjectSchema<NotificationGroupSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),

    type: yup
      .mixed<NotificationType>()
      .oneOf(Object.values(NotificationType))
      .required(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('Notification Group')

export type NotificationGroupRecord = yup.Asserts<typeof NotificationGroup>

export const table = (db: PrismaClient) => db.notificationGroup
export type NotificationGroupTable = ReturnType<typeof table>
