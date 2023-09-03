import { NotificationChannelType } from '../../services/notification/db/notification-channel-table'
import { NotificationEventResource } from '../../services/notification/db/notification-event-table'
import {
  NotificationFactoryNotification,
  NotificationFactoryNotificationChannel,
  NotificationFactoryNotificationChannelEmail,
  NotificationFactoryNotificationChannelWeb,
} from '../../services/notification/factory/notification'
import { getOrThrow } from '../../utils'
import { NexusGenObjects } from '../generated/nexus'

const appBaseUrl = getOrThrow(
  process.env.STITCHI_MARKETING_APPLICATION_HOST,
  'STITCHI_MARKETING_APPLICATION_HOST',
)

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
  resourceId,
  resource,
}: {
  channel: NotificationFactoryNotificationChannelWeb
  resource: NotificationEventResource
  resourceId: string
}): NexusGenObjects['NotificationChannelWeb'] => {
  let ctaUrl
  let ctaLabel

  switch (resource) {
    case NotificationEventResource.ORDER: {
      ctaUrl = `${appBaseUrl}/api/orders/${resourceId}`
      ctaLabel = 'View Order'
    }
  }

  return {
    ctaUrl,
    ctaLabel,
    id: channel.id,
    channelType: channel.channelType,
    message: channel.message,
  }
}

export const notificationFactoryNotificationChannelToGraphql = ({
  channel,
  resourceId,
  resource,
}: {
  channel: NotificationFactoryNotificationChannel
  resource: NotificationEventResource
  resourceId: string
}) => {
  switch (channel.channelType) {
    case NotificationChannelType.EMAIL:
      return notificationFactoryNotificationChannelEmailToGraphql(channel)
    case NotificationChannelType.WEB:
      return notificationFactoryNotificationChannelWebToGraphql({
        channel,
        resourceId,
        resource,
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
    userId: notification.userId,
    organizationId: notification.organizationId,
    notificationEventGroupId: notification.notificationEventGroupId,

    createdAt: notification.createdAt,
    updatedAt: notification.updatedAt,

    channels: notification.channels.map(channel =>
      notificationFactoryNotificationChannelToGraphql({
        channel,
        resourceId: notification.resourceId,
        resource: notification.resource,
      }),
    ),
  }
}
