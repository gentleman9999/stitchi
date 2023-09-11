import { NotificationWorkflow } from '@prisma/client'

export interface NotificationFactoryNotificationWorkflow
  extends NotificationWorkflow {}

const notificationFactoryNotificationWorkflow = ({
  notificationWorkflowRecord,
}: {
  notificationWorkflowRecord: NotificationWorkflow
}): NotificationFactoryNotificationWorkflow => {
  return {
    id: notificationWorkflowRecord.id,
    name: notificationWorkflowRecord.name,
  }
}

export { notificationFactoryNotificationWorkflow }
