import { NotificationEventGroupRecord } from '../db/notification-event-group-table'
import { NotificationFactoryNotification } from './notification'

export interface NotificationFactoryNotificationEventGroup
  extends NotificationEventGroupRecord {
  notifications: NotificationFactoryNotification[]
}

const notificationEventGroupFactory = ({
  notificationEventGroupRecord,
  notifications,
}: {
  notificationEventGroupRecord: NotificationEventGroupRecord
  notifications: NotificationFactoryNotification[]
}): NotificationFactoryNotificationEventGroup => {
  return {
    notifications,

    id: notificationEventGroupRecord.id,
    resourceId: notificationEventGroupRecord.resourceId,
    resource: notificationEventGroupRecord.resource,
    eventKey: notificationEventGroupRecord.eventKey,

    createdAt: notificationEventGroupRecord.createdAt,
    updatedAt: notificationEventGroupRecord.updatedAt,
  }
}

export { notificationEventGroupFactory }
