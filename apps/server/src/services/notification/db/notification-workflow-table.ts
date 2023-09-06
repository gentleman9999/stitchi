import { NotificationWorkflow, PrismaClient } from '@prisma/client'
import * as yup from 'yup'

export const NotificationWorkflowRecord: yup.ObjectSchema<NotificationWorkflow> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      name: yup.string().required(),
    })
    .label('Notification Workflow')

export type NotificationWorkflowRecord = yup.Asserts<
  typeof NotificationWorkflowRecord
>

export const table = (db: PrismaClient) => db.notificationWorkflow
export type NotificationWorkflowTable = ReturnType<typeof table>
