import { makeCreateNotification } from './create-notification'
import { makeListNotifications } from './list-notifications'
import { makeGetNotification } from './get-notification'

import { makeCreateNotificationTopic } from './create-notification-topic'
import { makeListNotificationTopics } from './list-notification-topics'

export interface NotificationRepositoryInit {}

export interface NotificationRepository {
  createNotification: ReturnType<typeof makeCreateNotification>
  listNotifications: ReturnType<typeof makeListNotifications>
  getNotification: ReturnType<typeof makeGetNotification>

  createNotificationTopic: ReturnType<typeof makeCreateNotificationTopic>
  listNotificationTopics: ReturnType<typeof makeListNotificationTopics>
}

type MakeNotificationRepositoryFn = (
  init?: NotificationRepositoryInit,
) => NotificationRepository

const makeNotificationRepository: MakeNotificationRepositoryFn = init => ({
  createNotification: makeCreateNotification(),
  listNotifications: makeListNotifications(),
  getNotification: makeGetNotification(),

  createNotificationTopic: makeCreateNotificationTopic(),
  listNotificationTopics: makeListNotificationTopics(),
})

export default makeNotificationRepository
