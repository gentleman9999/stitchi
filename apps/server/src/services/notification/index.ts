import makeNotificationRepository, {
  NotificationRepository,
} from './repository'
import { makeClient as makeSendgridClient } from '../../sendgrid'
import { getOrThrow } from '../../utils'
import { makeServiceMethods, Methods } from './methods'
import { NotificationChannelType } from './db/notification-channel-table'

const replyTo = getOrThrow(
  process.env.NOTIFICATION_EMAIL_REPLY_TO,
  'NOTIFICATION_EMAIL_REPLY_TO',
)

export interface NotificationClientService {
  createNotification: NotificationRepository['createNotification']
  getNotification: NotificationRepository['getNotification']
  listNotifications: NotificationRepository['listNotifications']

  createNotificationEventGroup: NotificationRepository['createNotificationEventGroup']

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
                    {
                      type: 'text/html',
                      value: channel.htmlBody,
                    },
                    ...(channel.textBody
                      ? ([
                          {
                            type: 'text/plain',
                            value: channel.textBody,
                          },
                        ] as const)
                      : []),
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
        console.error(error)
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
        console.error(error)
        throw new Error('Failed to list notifications')
      }
    },

    getNotification: async input => {
      try {
        const notification = await notificationRepository.getNotification(input)

        return notification
      } catch (error) {
        console.error(error)
        throw new Error('Failed to get notification')
      }
    },

    createNotificationEventGroup: async input => {
      let notificationGroup

      try {
        notificationGroup =
          await notificationRepository.createNotificationEventGroup(input)
      } catch (error) {
        throw new Error('Failed to create notification group')
      }

      return notificationGroup
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
