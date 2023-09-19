import { v4 } from 'uuid'
import { logger } from '../../../telemetry'
import { NotificationChannelType } from '../db/notification-channel-table'
import { NotificationFactoryNotificationChannel } from '../factory/notification'
import makeNotificationRepository, {
  NotificationRepository,
} from '../repository'
import { notifications } from '../templates'

interface Recipient {
  email: string
}

type NotificationKey = keyof typeof notifications

type SendAnonymousNotificationFn = <T extends NotificationKey>(
  notificationKey: T,
  notificationParams: Omit<Parameters<(typeof notifications)[T]>[0], ''>,
  recipients: Recipient[],
) => Promise<void>

type MakeMethodFn = (params?: {
  notificationRepository: NotificationRepository
}) => SendAnonymousNotificationFn

const makeMethod: MakeMethodFn =
  (
    { notificationRepository } = {
      notificationRepository: makeNotificationRepository(),
    },
  ) =>
  async (notificationKey, notificationParams, recipients): Promise<void> => {
    if (!recipients.length) {
      logger
        .child({
          context: {
            notificationKey,
            notificationParams,
          },
        })
        .warn(`No recipients`)

      return
    }

    const notificationWorkflowId = v4()

    // For each topic member, create a notification for each active channel
    for (const recipient of recipients) {
      // Get the notification (which includes it's channels)
      let notification

      try {
        notification = notifications[notificationKey]({
          ...(notificationParams as any),
        })
      } catch (error) {
        logger
          .child({
            context: {
              error,
              notificationKey,
            },
          })
          .error(`Template not found`)

        continue
      }

      let channels: NotificationFactoryNotificationChannel[] = []

      if (notification.email) {
        channels.push({
          id: undefined as any,
          channelType: NotificationChannelType.EMAIL,
          recipientEmail: recipient.email,
          recipientName: '',
          subject: notification.email.subject,
          htmlBody: notification.email.htmlBody,
          textBody: notification.email.textBody,
        })
      }

      if (!channels.length) {
        logger
          .child({
            context: {
              notificationKey,
              notificationParams,
            },
          })
          .error(`Template not found`)

        continue
      }

      logger.child({ context: { notification, channels } }).info('Sending')

      try {
        await notificationRepository.createNotification({
          notification: {
            notificationWorkflowId,
            channels,
            membershipId: null,
            notificationTopicId: null,
          },
        })
      } catch (error) {
        throw new Error('Failed to create notification')
      }
    }
  }

export { makeMethod }
