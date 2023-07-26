import { makeCreateNotification } from './create-notification'
import { makeListNotifications } from './list-notifications'
import { makeGetNotification } from './get-notification'
import { makeCreateNotificationGroup } from './create-notification-group'
import { makeGetNotificationGroup } from './get-notification-group'

export interface NotificationRepositoryInit {}

export interface NotificationRepository {
  createNotification: ReturnType<typeof makeCreateNotification>
  listNotifications: ReturnType<typeof makeListNotifications>
  getNotification: ReturnType<typeof makeGetNotification>

  createNotificationGroup: ReturnType<typeof makeCreateNotificationGroup>
  getNotificationGroup: ReturnType<typeof makeGetNotificationGroup>
}

type MakeNotificationRepositoryFn = (
  init?: NotificationRepositoryInit,
) => NotificationRepository

const makeNotificationRepository: MakeNotificationRepositoryFn = init => ({
  createNotification: makeCreateNotification(),
  listNotifications: makeListNotifications(),
  getNotification: makeGetNotification(),

  createNotificationGroup: makeCreateNotificationGroup(),
  getNotificationGroup: makeGetNotificationGroup(),
})

export default makeNotificationRepository
