import { NotificationGroupRecord } from '../db/notification-group-table'
import { NotificationFactoryNotification } from './notification'

export interface NotificationFactoryNotificationGroup
  extends NotificationGroupRecord {
  notifications: NotificationFactoryNotification[]
}

const notificationGroupFactory = ({
  notificationGroupRecord,
  notifications,
}: {
  notificationGroupRecord: NotificationGroupRecord
  notifications: NotificationFactoryNotification[]
}): NotificationFactoryNotificationGroup => {
  return {
    notifications,
    id: notificationGroupRecord.id,
    type: notificationGroupRecord.type,
    createdAt: notificationGroupRecord.createdAt,
    updatedAt: notificationGroupRecord.updatedAt,
  }
}

export { notificationGroupFactory }
