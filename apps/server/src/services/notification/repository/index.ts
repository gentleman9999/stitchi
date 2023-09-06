import { makeCreateNotification } from './create-notification'
import { makeListNotifications } from './list-notifications'
import { makeGetNotification } from './get-notification'

export interface NotificationRepositoryInit {}

export interface NotificationRepository {
  createNotification: ReturnType<typeof makeCreateNotification>
  listNotifications: ReturnType<typeof makeListNotifications>
  getNotification: ReturnType<typeof makeGetNotification>
}

type MakeNotificationRepositoryFn = (
  init?: NotificationRepositoryInit,
) => NotificationRepository

const makeNotificationRepository: MakeNotificationRepositoryFn = init => ({
  createNotification: makeCreateNotification(),
  listNotifications: makeListNotifications(),
  getNotification: makeGetNotification(),
})

export default makeNotificationRepository
