import makeNotificationRepository, {
  NotificationRepository,
} from './repository'
import { makeServiceMethods, Methods } from './methods'
import { NotificationFactoryNotificationTopic } from './factory/notification-topic'

export interface NotificationClientService {
  sendNotification: Methods['sendNotification']
  listNotifications: NotificationRepository['listNotifications']

  createNotificationTopic: (
    topicKey: string,
    membershipIds: string[],
  ) => Promise<NotificationFactoryNotificationTopic>
  listNotificationTopics: NotificationRepository['listNotificationTopics']

  addSubscribersToNotificationTopic: (
    topicKey: string,
    membershipIds: string[],
  ) => Promise<NotificationFactoryNotificationTopic>

  removeSubscribersFromNotificationTopic: (
    topicKey: string,
    membershipIds: string[],
  ) => Promise<NotificationFactoryNotificationTopic>
}

interface MakeClientParams {
  notificationRepository: NotificationRepository
  serviceMethods: Methods
}

type MakeClientFn = (params?: MakeClientParams) => NotificationClientService

const makeClient: MakeClientFn = (
  { notificationRepository, serviceMethods } = {
    notificationRepository: makeNotificationRepository(),
    serviceMethods: makeServiceMethods(),
  },
) => {
  return {
    sendNotification: serviceMethods.sendNotification,

    listNotifications: async input => {
      try {
        const notifications = await notificationRepository.listNotifications(
          input,
        )

        return notifications
      } catch (error) {
        throw new Error('Failed to list notifications')
      }
    },

    createNotificationTopic: async (topicKey, members) => {
      let notificationTopic

      try {
        notificationTopic =
          await notificationRepository.createNotificationTopic({
            notificationTopic: {
              topicKey,
              members: members.map(membershipId => ({
                membershipId,
              })),
            },
          })
      } catch (error) {
        throw new Error('Failed to create notification topic')
      }

      return notificationTopic
    },

    listNotificationTopics: async input => {
      let notificationTopics

      try {
        notificationTopics =
          await notificationRepository.listNotificationTopics(input)
      } catch (error) {
        throw new Error('Failed to list notification topics')
      }

      return notificationTopics
    },

    addSubscribersToNotificationTopic: async (topicKey, membershipIds) => {
      let existingNotificationTopic

      try {
        existingNotificationTopic = (
          await notificationRepository.listNotificationTopics({
            take: 1,
            where: {
              topicKey,
            },
          })
        )[0]

        if (!existingNotificationTopic) {
          throw new Error('Notification topic not found')
        }
      } catch (error) {
        throw new Error('Failed to get notification topic')
      }

      let notificationTopic

      try {
        notificationTopic =
          await notificationRepository.updateNotificationTopic({
            notificationTopic: {
              id: existingNotificationTopic.id,
              topicKey,
              members: membershipIds
                .map(membershipId => ({
                  membershipId,
                }))
                .concat(existingNotificationTopic.members),
            },
          })
      } catch (error) {
        throw new Error('Failed to add subscribers to notification topic')
      }

      return notificationTopic
    },

    removeSubscribersFromNotificationTopic: async (topicKey, membershipIds) => {
      let existingNotificationTopic

      try {
        existingNotificationTopic = (
          await notificationRepository.listNotificationTopics({
            take: 1,
            where: {
              topicKey,
            },
          })
        )[0]

        if (!existingNotificationTopic) {
          throw new Error('Notification topic not found')
        }
      } catch (error) {
        throw new Error('Failed to get notification topic')
      }

      let notificationTopic

      try {
        notificationTopic =
          await notificationRepository.updateNotificationTopic({
            notificationTopic: {
              id: existingNotificationTopic.id,
              topicKey,
              members: existingNotificationTopic.members.filter(
                ({ membershipId }) => !membershipIds.includes(membershipId),
              ),
            },
          })
      } catch (error) {
        throw new Error('Failed to remove subscribers from notification topic')
      }

      return notificationTopic
    },
  }
}

export { makeClient }
