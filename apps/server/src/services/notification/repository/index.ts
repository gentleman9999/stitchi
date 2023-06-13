import { makeCreateNotification } from './create-notification'

export interface NotificationRepositoryInit {}

export interface NotificationRepository {
  createNotification: ReturnType<typeof makeCreateNotification>
}

type MakeNotificationRepositoryFn = (
  init?: NotificationRepositoryInit,
) => NotificationRepository

const makeNotificationRepository: MakeNotificationRepositoryFn = init => ({
  createNotification: makeCreateNotification(),
})

export default makeNotificationRepository
