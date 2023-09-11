import { NotificationChannelType } from '../../services/notification/db/notification-channel-table'
import {
  NotificationFactoryNotification,
  NotificationFactoryNotificationChannel,
  NotificationFactoryNotificationChannelEmail,
  NotificationFactoryNotificationChannelWeb,
} from '../../services/notification/factory/notification'
import { NexusGenObjects } from '../generated/nexus'

export const notificationFactoryNotificationChannelEmailToGraphql = (
  channel: NotificationFactoryNotificationChannelEmail,
): NexusGenObjects['NotificationChannelEmail'] => {
  return {
    id: channel.id,
    channelType: channel.channelType,
    htmlBody: channel.htmlBody,
    recipientEmail: channel.recipientEmail,
    subject: channel.subject,
    textBody: channel.textBody,
    recipientName: channel.recipientName,
  }
}

export const notificationFactoryNotificationChannelWebToGraphql = ({
  channel,
}: {
  channel: NotificationFactoryNotificationChannelWeb
}): NexusGenObjects['NotificationChannelWeb'] => {
  return {
    id: channel.id,
    channelType: channel.channelType,
    message: channel.message,
    ctaText: channel.ctaText,
    ctaUrl: channel.ctaUrl,
  }
}

export const notificationFactoryNotificationChannelToGraphql = ({
  channel,
}: {
  channel: NotificationFactoryNotificationChannel
}) => {
  switch (channel.channelType) {
    case NotificationChannelType.EMAIL:
      return notificationFactoryNotificationChannelEmailToGraphql(channel)
    case NotificationChannelType.WEB:
      return notificationFactoryNotificationChannelWebToGraphql({
        channel,
      })
    default:
      throw new Error(
        `Unknown notification channel type: ${(channel as any).channelType}`,
      )
  }
}

export const notificationFactoryNotificationToGraphql = (
  notification: NotificationFactoryNotification,
): NexusGenObjects['Notification'] => {
  return {
    id: notification.id,
    membershipId: notification.membershipId,
    notificationWorkflowId: notification.notificationWorkflowId,
    notificationTopicId: notification.notificationTopicId,

    createdAt: notification.createdAt,
    updatedAt: notification.updatedAt,

    channels: notification.channels.map(channel =>
      notificationFactoryNotificationChannelToGraphql({
        channel,
      }),
    ),
  }
}
