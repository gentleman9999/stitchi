import makeNotificationRepository, {
  NotificationRepository,
} from './repository'
import { makeClient as makeSendgridClient } from '../../sendgrid'
import { getOrThrow } from '../../utils'
import makeTemplates, { Template } from './templates'
import { CreateNotificationGroupFn } from './methods/create-notification-group'
import { makeServiceMethods, Methods } from './methods'
import { logger } from '../../telemetry'

const replyTo = getOrThrow(
  process.env.NOTIFICATION_EMAIL_REPLY_TO,
  'NOTIFICATION_EMAIL_REPLY_TO',
)

export interface NotificationClientService {
  createNotification: NotificationRepository['createNotification']
  getNotification: NotificationRepository['getNotification']
  listNotifications: NotificationRepository['listNotifications']

  createNotificationGroup: CreateNotificationGroupFn
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

        // if (notification.method === 'email') {
        //   console.info(`Sending email notification: ${notification.id}`, {
        //     context: { notification },
        //   })

        //   await sendgridClient.sendTransactionalEmail({
        //     message: {
        //       subject: notification.subject,
        //       content: [
        //         {
        //           type: 'text/html',
        //           value: notification.htmlBody,
        //         },
        //         ...(notification.textBody
        //           ? ([
        //               {
        //                 type: 'text/plain',
        //                 value: notification.textBody,
        //               },
        //             ] as const)
        //           : []),
        //       ],
        //       sendAt: notification.sendAt
        //         ? getUnixTime(notification.sendAt)
        //         : undefined,
        //       from: {
        //         email: replyTo,
        //         name: 'Stitchi',
        //       },
        //       replyTo: {
        //         email: replyTo,
        //         name: 'Stitchi',
        //       },
        //       personalizations: [
        //         {
        //           to: [
        //             {
        //               email: notification.recipientEmail,
        //               name: notification.recipientName || undefined,
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //   })
        // }

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

    createNotificationGroup: async (type, params) => {
      let notificationGroup

      try {
        notificationGroup = await serviceMethods.createNotificationGroup(
          type,
          params,
        )
      } catch (error) {
        logger
          .child({
            context: {
              error,
              params,
              type,
            },
          })
          .error('Failed to create notificationg group')
        throw new Error('Failed to create notification group')
      }
    },
  }
}

export { makeClient }
