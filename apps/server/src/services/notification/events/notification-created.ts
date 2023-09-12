import {
  SendgridClient,
  makeClient as makeSendgridClient,
} from '../../../sendgrid'
import { getOrThrow } from '../../../utils'
import { NotificationChannelType } from '../db/notification-channel-table'
import { NotificationFactoryNotification } from '../factory/notification'

const replyTo = getOrThrow(
  process.env.NOTIFICATION_EMAIL_REPLY_TO,
  'NOTIFICATION_EMAIL_REPLY_TO',
)

const from = getOrThrow(
  process.env.NOTIFICATION_EMAIL_FROM,
  'NOTIFICATION_EMAIL_FROM',
)

export interface NotificationCreatedEventPayload {
  nextNotification: NotificationFactoryNotification
}

interface MakeHandlerParams {
  sendgridClient: SendgridClient
}

interface NotificationCreatedEventHandler {
  (payload: NotificationCreatedEventPayload): Promise<void>
}

const makeHandler =
  (
    { sendgridClient }: MakeHandlerParams = {
      sendgridClient: makeSendgridClient(),
    },
  ): NotificationCreatedEventHandler =>
  async ({ nextNotification: notification }) => {
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
                email: from,
                name: 'Stitchi Notifications',
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
  }

export { makeHandler }
