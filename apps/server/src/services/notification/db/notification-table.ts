import {
  PrismaClient,
  Notification as NotificationSchema,
} from '@prisma/client'
import * as yup from 'yup'
import {
  NotificationEventKey,
  NotificationEventResource,
} from './notification-event-table'

interface Notification
  extends Omit<NotificationSchema, 'resource' | 'eventKey'> {
  resource: NotificationEventResource
  eventKey: NotificationEventKey
}

export const Notification: yup.ObjectSchema<Notification> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    notificationEventGroupId: yup.string().uuid().required(),

    userId: yup.string().nullable().defined(),
    organizationId: yup.string().uuid().nullable().defined(),

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
  .label('Notification')

export type NotificationRecord = yup.Asserts<typeof Notification>

export const table = (db: PrismaClient) => db.notification
export type NotificationTable = ReturnType<typeof table>
