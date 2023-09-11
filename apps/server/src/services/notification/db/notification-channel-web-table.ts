import {
  PrismaClient,
  NotificationChannelWeb as NotificationChannelWebSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const NotificationChannelWeb: yup.ObjectSchema<NotificationChannelWebSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      message: yup.string().required(),
      ctaText: yup.string().optional().defined(),
      ctaUrl: yup.string().optional().defined(),
    })
    .label('Notification Channel Web')

export type NotificationChannelWebRecord = yup.Asserts<
  typeof NotificationChannelWeb
>

export const table = (db: PrismaClient) => db.notificationChannelWeb
export type NotificationChannelWebTable = ReturnType<typeof table>
