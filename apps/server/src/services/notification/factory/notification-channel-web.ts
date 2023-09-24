import { NotificationChannelType } from '../db/notification-channel-table'
import { NotificationChannelWebRecord } from '../db/notification-channel-web-table'

export interface NotificationFactoryNotificationChannelWeb
  extends NotificationChannelWebRecord {
  channelType: NotificationChannelType.WEB
}

const notificationFactoryNotificationChannelWeb = ({
  notificationChannelWebRecord,
}: {
  notificationChannelWebRecord: NotificationChannelWebRecord
}): NotificationFactoryNotificationChannelWeb => {
  return {
    id: notificationChannelWebRecord.id,
    channelType: NotificationChannelType.WEB,
    message: notificationChannelWebRecord.message,
    ctaText: notificationChannelWebRecord.ctaText,
    ctaUrl: notificationChannelWebRecord.ctaUrl,
    seenAt: notificationChannelWebRecord.seenAt,
  }
}

export { notificationFactoryNotificationChannelWeb }
