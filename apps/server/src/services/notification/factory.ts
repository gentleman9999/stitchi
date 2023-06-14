import { NotificationRecord } from './db/notification'
import { NotificationEmailRecord } from './db/notification-email'

export interface NotificationFactoryNotificationEmail
  extends NotificationEmailRecord,
    NotificationRecord {
  method: 'email'
}

export type NotificationFactoryNotification =
  NotificationFactoryNotificationEmail

const notificationFactory = ({
  notificationEmailRecord,
  notificationRecord,
}: {
  notificationRecord: NotificationRecord
  notificationEmailRecord: NotificationEmailRecord | null
}): NotificationFactoryNotification => {
  if (!notificationEmailRecord)
    throw new Error('NotificationEmailRecord is required')

  return { ...notificationRecord, ...notificationEmailRecord, method: 'email' }
}

export interface NotificationFactoryNotificationTemplate {
  subject: string
  htmlBody: string
}

export { notificationFactory }
