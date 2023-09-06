import { NotificationTopic, PrismaClient } from '@prisma/client'
import * as yup from 'yup'

export const NotificationTopicRecord: yup.ObjectSchema<NotificationTopic> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    topicKey: yup.string().required(),
  })
  .label('Notification Topic')

export type NotificationTopicRecord = yup.Asserts<
  typeof NotificationTopicRecord
>

export const table = (db: PrismaClient) => db.notificationTopic
export type NotificationTopicTable = ReturnType<typeof table>
