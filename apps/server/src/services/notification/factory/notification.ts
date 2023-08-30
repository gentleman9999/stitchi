import { notEmpty } from '../../../utils'
import { NotificationChannelEmailRecord } from '../db/notification-channel-email-table'
import {
  NotificationChannelRecord,
  NotificationChannelType,
} from '../db/notification-channel-table'
import { NotificationChannelWebRecord } from '../db/notification-channel-web-table'
import { NotificationEventResource } from '../db/notification-event-table'
import { NotificationRecord } from '../db/notification-table'

export interface NotificationFactoryNotificationChannelEmail
  extends NotificationChannelEmailRecord {
  channelType: NotificationChannelType.EMAIL
}

export interface NotificationFactoryNotificationChannelWeb
  extends NotificationChannelWebRecord {
  channelType: NotificationChannelType.WEB
}

export type NotificationFactoryNotificationChannel =
  | NotificationFactoryNotificationChannelEmail
  | NotificationFactoryNotificationChannelWeb

interface ExtendedNotificationChannelRecord extends NotificationChannelRecord {
  email?: NotificationChannelEmailRecord | null
  web?: NotificationChannelWebRecord | null
}

export interface NotificationFactoryNotification extends NotificationRecord {
  channels: NotificationFactoryNotificationChannel[]
  resource: NotificationEventResource
}

const notificationFactory = ({
  notificationRecord,
  channels,
}: {
  notificationRecord: NotificationRecord
  channels: ExtendedNotificationChannelRecord[]
}): NotificationFactoryNotification => {
  const serializedChannels = channels
    .map<NotificationFactoryNotificationChannel | null>(channel => {
      switch (channel.channelType) {
        case NotificationChannelType.EMAIL:
          if (!channel.email) {
            return null
          }

          return {
            id: channel.id,
            channelType: NotificationChannelType.EMAIL,
            subject: channel.email.subject,
            htmlBody: channel.email.htmlBody,
            textBody: channel.email.textBody,
            recipientName: channel.email.recipientName,
            recipientEmail: channel.email.recipientEmail,
          }

        case NotificationChannelType.WEB:
          if (!channel.web) {
            return null
          }

          return {
            id: channel.id,
            channelType: NotificationChannelType.WEB,
            message: channel.web.message,
          }

        default:
          throw new Error(
            `Unknown notification channel channelType: ${channel.channelType}`,
          )
      }
    })
    .filter(notEmpty)

  return {
    id: notificationRecord.id,
    userId: notificationRecord.userId,
    organizationId: notificationRecord.organizationId,
    notificationEventGroupId: notificationRecord.notificationEventGroupId,

    channels: serializedChannels,

    resourceId: notificationRecord.resourceId,
    resource: notificationRecord.resource,
    eventKey: notificationRecord.eventKey,

    createdAt: notificationRecord.createdAt,
    updatedAt: notificationRecord.updatedAt,
  }
}

export { notificationFactory }
