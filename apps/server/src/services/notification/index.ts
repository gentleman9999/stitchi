import makeNotificationRepository, {
  NotificationRepository,
} from './repository'
import { makeClient as makeSendgridClient } from '../../sendgrid'
import { getOrThrow } from '../../utils'
import { getUnixTime } from 'date-fns'
import templatesFactory, { TemplateFactory } from './templates'

const replyTo = getOrThrow(
  process.env.NOTIFICATION_EMAIL_REPLY_TO,
  'NOTIFICATION_EMAIL_REPLY_TO',
)

export interface NotificationClientService {
  createNotification: NotificationRepository['createNotification']
  renderNotificationTemplate: TemplateFactory['render']
}

interface MakeClientParams {
  notificationRepository: NotificationRepository
  sendgridClient: ReturnType<typeof makeSendgridClient>
}

type MakeClientFn = (params?: MakeClientParams) => NotificationClientService

const makeClient: MakeClientFn = (
  { sendgridClient, notificationRepository } = {
    sendgridClient: makeSendgridClient(),
    notificationRepository: makeNotificationRepository(),
  },
) => {
  return {
    renderNotificationTemplate: params => {
      let template

      try {
        template = templatesFactory.render(params)
      } catch (error) {
        console.error(`Failed to render template: ${params.id}`, {
          context: { params },
        })
        throw error
      }

      return template
    },
    createNotification: async input => {
      try {
        const notification = await notificationRepository.createNotification({
          notification: input.notification,
        })

        if (notification.method === 'email') {
          console.info(`Sending email notification: ${notification.id}`, {
            context: { notification },
          })

          await sendgridClient.sendTransactionalEmail({
            message: {
              subject: notification.subject,
              content: [
                {
                  type: 'text/html',
                  value: notification.htmlBody,
                },
                ...(notification.textBody
                  ? ([
                      {
                        type: 'text/plain',
                        value: notification.textBody,
                      },
                    ] as const)
                  : []),
              ],
              sendAt: notification.sendAt
                ? getUnixTime(notification.sendAt)
                : undefined,
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
                      email: notification.recipientEmail,
                      name: notification.recipientName || undefined,
                    },
                  ],
                },
              ],
            },
          })
        }

        return notification
      } catch (error) {
        console.error(error)
        throw new Error('Failed to create notification')
      }
    },
  }
}

export { makeClient }
