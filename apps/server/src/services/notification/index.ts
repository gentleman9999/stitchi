import makeNotificationRepository, {
  NotificationRepository,
} from './repository'
import { makeClient as makeSendgridClient } from '../../sendgrid'
import { getOrThrow } from '../../utils'
import { makeServiceMethods, Methods } from './methods'
import { NotificationChannelType } from './db/notification-channel-table'
import { logger } from '../../telemetry'

const replyTo = getOrThrow(
  process.env.NOTIFICATION_EMAIL_REPLY_TO,
  'NOTIFICATION_EMAIL_REPLY_TO',
)

export interface NotificationClientService {
  createNotification: NotificationRepository['createNotification']
  getNotification: NotificationRepository['getNotification']
  listNotifications: NotificationRepository['listNotifications']

  createNotificationTopic: NotificationRepository['createNotificationTopic']
  listNotificationTopics: NotificationRepository['listNotificationTopics']

  getNotificationTemplate: Methods['getNotificationTemplate']
}

interface MakeClientParams {
  notificationRepository: NotificationRepository
  sendgridClient: ReturnType<typeof makeSendgridClient>

  serviceMethods: Methods
}

type MakeClientFn = (params?: MakeClientParams) => NotificationClientService

const makeClient: MakeClientFn = (
  { sendgridClient, notificationRepository, serviceMethods } = {
    sendgridClient: makeSendgridClient(),
    notificationRepository: makeNotificationRepository(),
    serviceMethods: makeServiceMethods(),
  },
) => {
  return {
    createNotification: async input => {
      try {
        const notification = await notificationRepository.createNotification({
          notification: input.notification,
        })

        // TODO: Send notification (async)
        for (const channel of notification.channels) {
          switch (channel.channelType) {
            case NotificationChannelType.EMAIL: {
              console.info(`Sending email notification: ${notification.id}`, {
                context: { notification, channel },
              })

              await sendgridClient.sendTransactionalEmail({
                message: {
                  subject: channel.subject,
                  content: [
                    // text/plain must be first
                    ...(channel.textBody
                      ? ([
                          {
                            type: 'text/plain',
                            value: channel.textBody,
                          },
                        ] as const)
                      : []),
                    // followed by text/html
                    {
                      type: 'text/html',
                      value: channel.htmlBody,
                    },
                  ],
                  from: {
                    email: replyTo,
                    name: 'Stitchi',
                  },
                  replyTo: {
                    email: replyTo,
                    name: 'Stitchi',
                  },
                  personalizations: [
                    {
                      to: [
                        {
                          email: channel.recipientEmail,
                          name: channel.recipientName || undefined,
                        },
                      ],
                    },
                  ],
                },
              })
            }
          }
        }

        return notification
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to create notification')
      }
    },

    listNotifications: async input => {
      try {
        const notifications = await notificationRepository.listNotifications(
          input,
        )

        return notifications
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to list notifications')
      }
    },

    getNotification: async input => {
      try {
        const notification = await notificationRepository.getNotification(input)

        return notification
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to get notification')
      }
    },

    createNotificationTopic: async input => {
      let notificationTopic

      try {
        notificationTopic =
          await notificationRepository.createNotificationTopic(input)
      } catch (error) {
        throw new Error('Failed to create notification topic')
      }

      return notificationTopic
    },

    listNotificationTopics: async input => {
      let notificationTopics

      try {
        notificationTopics =
          await notificationRepository.listNotificationTopics(input)
      } catch (error) {
        throw new Error('Failed to list notification topics')
      }

      return notificationTopics
    },

    getNotificationTemplate: id => {
      let template

      try {
        template = serviceMethods.getNotificationTemplate(id)
      } catch (error) {
        throw new Error('Failed to get notification template')
      }

      return template
    },
  }
}

export { makeClient }
