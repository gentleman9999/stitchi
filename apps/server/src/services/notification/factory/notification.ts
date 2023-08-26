import { notEmpty } from '../../../utils'
import { NotificationChannelEmailRecord } from '../db/notification-channel-email-table'
import { NotificationChannelSmsRecord } from '../db/notification-channel-sms-table'
import {
  NotificationChannelRecord,
  NotificationChannelType,
} from '../db/notification-channel-table'
import { NotificationChannelWebRecord } from '../db/notification-channel-web-table'
import { NotificationRecord } from '../db/notification-table'

interface NotificationFactoryNotificationChannelSms
  extends NotificationChannelSmsRecord {
  type: NotificationChannelType.SMS
}

interface NotificationFactoryNotificationChannelEmail
  extends NotificationChannelEmailRecord {
  type: NotificationChannelType.EMAIL
}

interface NotificationFactoryNotificationChannelWeb
  extends NotificationChannelWebRecord {
  type: NotificationChannelType.WEB
}

export type NotificationFactoryNotificationChannel =
  | NotificationFactoryNotificationChannelSms
  | NotificationFactoryNotificationChannelEmail
  | NotificationFactoryNotificationChannelWeb

interface ExtendedNotificationChannelRecord extends NotificationChannelRecord {
  sms?: NotificationChannelSmsRecord | null
  email?: NotificationChannelEmailRecord | null
  web?: NotificationChannelWebRecord | null
}

export interface NotificationFactoryNotification extends NotificationRecord {
  channels: NotificationFactoryNotificationChannel[]
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
      switch (channel.type) {
        case NotificationChannelType.SMS:
          if (!channel.sms) {
            return null
          }

          return {
            id: channel.id,
            type: NotificationChannelType.SMS,
            message: channel.sms.message,
          }
        case NotificationChannelType.EMAIL:
          if (!channel.email) {
            return null
          }

          return {
            id: channel.id,
            type: NotificationChannelType.EMAIL,
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
            type: NotificationChannelType.WEB,
            message: channel.web.message,
          }

        default:
          throw new Error(`Unknown notification channel type: ${channel.type}`)
      }
    })
    .filter(notEmpty)

  return {
    id: notificationRecord.id,
    userId: notificationRecord.userId,
    organizationId: notificationRecord.organizationId,
    notificationGroupId: notificationRecord.notificationGroupId,

    type: notificationRecord.type,
    sentAt: notificationRecord.sentAt,

    channels: serializedChannels,

    createdAt: notificationRecord.createdAt,
    updatedAt: notificationRecord.updatedAt,
  }
}

export { notificationFactory }
