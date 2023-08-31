import { logger } from '../../../telemetry'
import { DesignFactoryDesignRequest } from '../../design/factory'
import { NotificationChannelType } from '../db/notification-channel-table'
import { NotificationRecordType } from '../db/notification-table'
import { NotificationFactoryNotification } from '../factory/notification'
import { notificationGroupFactory } from '../factory/notification-group'
import makeNotificationRepository, {
  NotificationRepository,
} from '../repository'
import { CreateNotificationChannelInput } from '../repository/create-notification'
import makeTemplates, { Templates } from '../templates'

type CreateDesignRequestSubmittedNotificationGroup = (
  type: NotificationRecordType.DESIGN_REQUEST_SUBMITTED,
  params: {
    designRequest: DesignFactoryDesignRequest
  },
) => any

export type CreateNotificationGroupFn =
  CreateDesignRequestSubmittedNotificationGroup

interface MakeMethodParams {
  templates: Templates
  notificationRepository: NotificationRepository
}

type MakeMethodFn = (params?: MakeMethodParams) => CreateNotificationGroupFn

const makeMethod: MakeMethodFn =
  (
    { notificationRepository, templates } = {
      notificationRepository: makeNotificationRepository(),
      templates: makeTemplates(),
    },
  ) =>
  async (type, params) => {
    switch (type) {
      case NotificationRecordType.DESIGN_REQUEST_SUBMITTED:
        let notificationGroup

        try {
          notificationGroup =
            await notificationRepository.createNotificationGroup({
              notificationGroup: {
                type,
              },
            })

          if (!notificationGroup) {
            throw new Error('Failed to create notification group')
          }
        } catch (error) {
          logger
            .child({
              context: {
                error,
                type,
                params,
              },
            })
            .error('Failed to create notification group')

          throw error
        }

        let notifications: NotificationFactoryNotification[] = []

        try {
          // Create customer notification

          const customerNotificationTemplate = templates[
            'design_request.submitted.user'
          ]({
            designRequest: params.designRequest,
          })

          const channelInput: NonNullable<CreateNotificationChannelInput>[] = []

          if (customerNotificationTemplate.email) {
            channelInput.push({
              type: NotificationChannelType.EMAIL,
              htmlBody: customerNotificationTemplate.email.htmlBody,
              textBody: customerNotificationTemplate.email.textBody || null,
              subject: customerNotificationTemplate.email.subject,
              recipientEmail: '',
              recipientName: '',
            })
          }

          if (customerNotificationTemplate.sms) {
            channelInput.push({
              type: NotificationChannelType.SMS,
              message: customerNotificationTemplate.sms.message,
            })
          }

          if (customerNotificationTemplate.web) {
            channelInput.push({
              type: NotificationChannelType.WEB,
              message: customerNotificationTemplate.web.message,
            })
          }

          const customerNotification =
            await notificationRepository.createNotification({
              notification: {
                type,
                userId: params.designRequest.userId,
                organizationId: params.designRequest.organizationId,
                notificationGroupId: notificationGroup.id,
                channels: channelInput,
              },
            })

          notifications.push(customerNotification)
        } catch (error) {
          logger
            .child({
              context: {
                error,
                type,
                params,
              },
            })
            .error('Failed to create customer notification')
        }

        try {
          // Create admin notification

          const adminNotificationTemplate = templates[
            'design_request.submitted.admin'
          ]({
            designRequest: params.designRequest,
          })

          const channelInput: NonNullable<CreateNotificationChannelInput>[] = []

          if (adminNotificationTemplate.email) {
            channelInput.push({
              type: NotificationChannelType.EMAIL,
              htmlBody: adminNotificationTemplate.email.htmlBody,
              textBody: adminNotificationTemplate.email.textBody || null,
              subject: adminNotificationTemplate.email.subject,
              recipientEmail: '',
              recipientName: '',
            })
          }

          if (adminNotificationTemplate.sms) {
            channelInput.push({
              type: NotificationChannelType.SMS,
              message: adminNotificationTemplate.sms.message,
            })
          }

          if (adminNotificationTemplate.web) {
            channelInput.push({
              type: NotificationChannelType.WEB,
              message: adminNotificationTemplate.web.message,
            })
          }

          const adminNotification =
            await notificationRepository.createNotification({
              notification: {
                type,
                userId: '',
                organizationId: '',
                notificationGroupId: notificationGroup.id,
                channels: channelInput,
              },
            })

          notifications.push(adminNotification)
        } catch (error) {
          logger
            .child({
              context: {
                error,
                type,
                params,
              },
            })
            .error('Failed to create admin notification')
        }

        try {
          // Create artist notification

          const artistNotificationTemplate = templates[
            'design_request.submitted.admin'
          ]({
            designRequest: params.designRequest,
          })

          const channelInput: NonNullable<CreateNotificationChannelInput>[] = []

          if (artistNotificationTemplate.email) {
            channelInput.push({
              type: NotificationChannelType.EMAIL,
              htmlBody: artistNotificationTemplate.email.htmlBody,
              textBody: artistNotificationTemplate.email.textBody || null,
              subject: artistNotificationTemplate.email.subject,
              recipientEmail: '',
              recipientName: '',
            })
          }

          if (artistNotificationTemplate.sms) {
            channelInput.push({
              type: NotificationChannelType.SMS,
              message: artistNotificationTemplate.sms.message,
            })
          }

          if (artistNotificationTemplate.web) {
            channelInput.push({
              type: NotificationChannelType.WEB,
              message: artistNotificationTemplate.web.message,
            })
          }

          const artistNotification =
            await notificationRepository.createNotification({
              notification: {
                type,
                userId: '',
                organizationId: '',
                notificationGroupId: notificationGroup.id,
                channels: channelInput,
              },
            })

          notifications.push(artistNotification)
        } catch (error) {
          logger
            .child({
              context: {
                error,
                type,
                params,
              },
            })
            .error('Failed to create artist notification')
        }

        return notificationGroupFactory({
          notificationGroupRecord: notificationGroup,
          notifications,
        })

      default:
        throw new Error(`Invalid notification type: ${type}`)
    }
  }

export { makeMethod }
