import { NotificationTopicMember, PrismaClient } from '@prisma/client'
import * as yup from 'yup'

export const NotificationTopicMemberRecord: yup.ObjectSchema<NotificationTopicMember> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      notificationTopicId: yup.string().uuid().required(),
      membershipId: yup.string().uuid().required(),

      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
    })
    .label('Notification Topic Member')

export type NotificationTopicMemberRecord = yup.Asserts<
  typeof NotificationTopicMemberRecord
>

export const table = (db: PrismaClient) => db.notificationTopicMember
export type NotificationTopicMemberTable = ReturnType<typeof table>
