import { NotificationChannel } from '@prisma/client'
import { notEmpty } from '../../../utils'
import { NotificationChannelEmailRecord } from '../db/notification-channel-email-table'
import { NotificationChannelType } from '../db/notification-channel-table'
import { NotificationChannelWebRecord } from '../db/notification-channel-web-table'
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

interface ExtendedNotificationChannelRecord extends NotificationChannel {
  email?: NotificationChannelEmailRecord | null
  web?: NotificationChannelWebRecord | null
}

export interface NotificationFactoryNotification extends NotificationRecord {
  channels: NotificationFactoryNotificationChannel[]
}

const notificationFactoryNotification = ({
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
    membershipId: notificationRecord.membershipId,
    organizationId: notificationRecord.organizationId,
    notificationTopicId: notificationRecord.notificationTopicId,
    notificationWorkflowId: notificationRecord.notificationWorkflowId,

    channels: serializedChannels,

    createdAt: notificationRecord.createdAt,
    updatedAt: notificationRecord.updatedAt,
  }
}

export { notificationFactoryNotification }
