import { makeCreateNotification } from './create-notification'
import { makeListNotifications } from './list-notifications'
import { makeGetNotification } from './get-notification'
import { makeCreateNotificationEventGroup } from './create-notification-group'
import { makeGetNotificationEventGroup } from './get-notification-group'

export interface NotificationRepositoryInit {}

export interface NotificationRepository {
  createNotification: ReturnType<typeof makeCreateNotification>
  listNotifications: ReturnType<typeof makeListNotifications>
  getNotification: ReturnType<typeof makeGetNotification>

  createNotificationEventGroup: ReturnType<
    typeof makeCreateNotificationEventGroup
  >
  getNotificationEventGroup: ReturnType<typeof makeGetNotificationEventGroup>
}

type MakeNotificationRepositoryFn = (
  init?: NotificationRepositoryInit,
) => NotificationRepository

const makeNotificationRepository: MakeNotificationRepositoryFn = init => ({
  createNotification: makeCreateNotification(),
  listNotifications: makeListNotifications(),
  getNotification: makeGetNotification(),

  createNotificationEventGroup: makeCreateNotificationEventGroup(),
  getNotificationEventGroup: makeGetNotificationEventGroup(),
})

export default makeNotificationRepository
