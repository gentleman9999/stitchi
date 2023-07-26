import { DesignFactoryDesignRequest } from '../../design/factory'
import { NotificationRecordType } from '../db/notification-table'
import { NotificationFactoryNotification } from '../factory/notification'
import makeNotificationRepository, {
  NotificationRepository,
} from '../repository'

type CreateDesignRequestSubmittedNotificationGroup = (
  type: NotificationRecordType.DESIGN_REQUEST_SUBMITTED,
  params: {
    designRequest: DesignFactoryDesignRequest
  },
) => any

export type CreateNotificationGroupFn =
  CreateDesignRequestSubmittedNotificationGroup

interface MakeMethodParams {
  notificationRepository: NotificationRepository
}

type MakeMethodFn = (
  params?: MakeMethodParams,
) => Promise<CreateNotificationGroupFn>

const makeMethod: MakeMethodFn =
  (
    { notificationRepository } = {
      notificationRepository: makeNotificationRepository(),
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
        } catch (error) {
          console.error('Failed to create notification group', {
            context: {
              error,
              type,
              params,
            },
          })
        }

        let notifications: NotificationFactoryNotification[] = []

        try {
          // Create customer notification

          const customerNotification =
            await notificationRepository.createNotification({
              notification: {
                type,
                userId: params.designRequest.userId,
                organizationId: params.designRequest.organizationId,
                notificationGroupId: notificationGroup?.id || null,
                channels: [
                  {
                    type: 'sms',
                  },
                ],
              },
            })

          notifications.push(customerNotification)
        } catch (error) {
          console.error('Failed to create customer notification', {
            context: {
              error,
              type,
              params,
            },
          })
        }

      default:
        throw new Error(`Invalid notification type: ${type}`)
    }
  }

export { makeMethod }
