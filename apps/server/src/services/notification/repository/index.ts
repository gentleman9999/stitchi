import { makeCreateNotification } from './create-notification'
import { makeListNotifications } from './list-notifications'
import { makeListNotificationsCount } from './list-notifications-count'
import { makeGetNotification } from './get-notification'

import { makeCreateNotificationTopic } from './create-notification-topic'
import { makeListNotificationTopics } from './list-notification-topics'
import { makeUpdateNotificationTopic } from './update-notification-topic'

import { makeUpdateNotificationChannelWeb } from './update-notification-channel-web'

export interface NotificationRepositoryInit {}

export interface NotificationRepository {
  createNotification: ReturnType<typeof makeCreateNotification>
  listNotifications: ReturnType<typeof makeListNotifications>
  listNotificationsCount: ReturnType<typeof makeListNotificationsCount>
  getNotification: ReturnType<typeof makeGetNotification>

  createNotificationTopic: ReturnType<typeof makeCreateNotificationTopic>
  listNotificationTopics: ReturnType<typeof makeListNotificationTopics>
  updateNotificationTopic: ReturnType<typeof makeUpdateNotificationTopic>

  updateNotificationChannelWeb: ReturnType<
    typeof makeUpdateNotificationChannelWeb
  >
}

type MakeNotificationRepositoryFn = (
  init?: NotificationRepositoryInit,
) => NotificationRepository

const makeNotificationRepository: MakeNotificationRepositoryFn = init => ({
  createNotification: makeCreateNotification(),
  listNotifications: makeListNotifications(),
  listNotificationsCount: makeListNotificationsCount(),
  getNotification: makeGetNotification(),

  createNotificationTopic: makeCreateNotificationTopic(),
  listNotificationTopics: makeListNotificationTopics(),
  updateNotificationTopic: makeUpdateNotificationTopic(),

  updateNotificationChannelWeb: makeUpdateNotificationChannelWeb(),
})

export default makeNotificationRepository
