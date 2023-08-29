import {
  PrismaClient,
  NotificationEventGroup as NotificationEventGroupSchema,
} from '@prisma/client'
import * as yup from 'yup'

export enum NotificationEventResource {
  ORDER = 'ORDER',
}

export enum NotificationEventKey {
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
}

export const NotificationEventGroup: yup.ObjectSchema<NotificationEventGroupSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),

      resourceId: yup.string().required(),
      resource: yup
        .mixed<NotificationEventResource>()
        .oneOf(Object.values(NotificationEventResource))
        .required(),

      eventKey: yup
        .mixed<NotificationEventKey>()
        .oneOf(Object.values(NotificationEventKey))
        .required(),

      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
    })
    .label('Notification Group')

export type NotificationEventGroupRecord = yup.Asserts<
  typeof NotificationEventGroup
>

export const table = (db: PrismaClient) => db.notificationEventGroup
export type NotificationEventGroupTable = ReturnType<typeof table>
