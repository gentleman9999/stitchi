import { v4 } from 'uuid'
import { logger } from '../../../telemetry'
import {
  MembershipService,
  makeClient as makeMembershipService,
} from '../../membership'
import { UserService, makeClient as makeUserService } from '../../user'
import { NotificationChannelType } from '../db/notification-channel-table'
import { NotificationFactoryNotificationChannel } from '../factory/notification'
import makeNotificationRepository, {
  NotificationRepository,
} from '../repository'
import { notifications } from '../templates'

type NotificationKey = keyof typeof notifications

type SendNotificationFn = <T extends NotificationKey>(
  notificationKey: T,
  notificationParams: Omit<
    Parameters<(typeof notifications)[T]>[0],
    'membership' | 'user'
  >,
  recipient: {
    topicKey?: string
  },
) => Promise<void>

type MakeMethodFn = (params?: {
  notificationRepository: NotificationRepository
  membershipService: MembershipService
  userService: UserService
}) => SendNotificationFn

const makeMethod: MakeMethodFn =
  (
    { notificationRepository, membershipService, userService } = {
      notificationRepository: makeNotificationRepository(),
      membershipService: makeMembershipService(),
      userService: makeUserService(),
    },
  ) =>
  async (notificationKey, notificationParams, recipient): Promise<void> => {
    if (!recipient.topicKey) {
      throw new Error('Topic key is required')
    }

    let topic

    try {
      const topics = await notificationRepository.listNotificationTopics({
        take: 1,
        where: {
          topicKey: recipient.topicKey,
        },
      })

      topic = topics[0]
    } catch (error) {
      throw new Error('Failed to get notification topic')
    }

    if (!topic) {
      throw new Error('Notification topic not found')
    }

    const notificationWorkflowId = v4()

    // For each topic member, create a notification for each active channel
    for (const member of topic.members) {
      let membership

      try {
        membership = await membershipService.getMembership({
          membershipId: member.membershipId,
        })
      } catch (error) {
        throw new Error('Failed to get membership')
      }

      if (!membership.userId) {
        // This is an "invited" membership, so we don't have a user to notify
        continue
      }

      let notificationSetting

      try {
        notificationSetting =
          await membershipService.getMembershipNotificationSetting(
            member.membershipId,
          )
      } catch (error) {
        throw new Error('Failed to get membership notification setting')
      }

      let user

      try {
        user = await userService.getUser({
          id: membership.userId,
        })
      } catch (error) {
        throw new Error('Failed to get user')
      }

      // Get the notification (which includes it's channels)
      const notification = notifications[notificationKey]({
        ...notificationParams,
        membership,
        user,
      } as any)

      let channels: NotificationFactoryNotificationChannel[] = []

      if (
        notification.email &&
        notificationSetting.emailNotificationsEnabled &&
        user.email
      ) {
        channels.push({
          id: undefined as any,
          channelType: NotificationChannelType.EMAIL,
          recipientEmail: user.email,
          recipientName: user.name || '',
          subject: notification.email.subject,
          htmlBody: notification.email.htmlBody,
          textBody: notification.email.textBody,
        })
      }

      if (notification.web && notificationSetting.webNotificationsEnabled) {
        channels.push({
          id: undefined as any,
          channelType: NotificationChannelType.WEB,
          message: notification.web.message,
          ctaText: notification.web.ctaText,
          ctaUrl: notification.web.ctaUrl,
          seenAt: null,
        })
      }

      if (!channels) {
        logger
          .child({
            context: {
              notificationKey,
              notificationParams,
              membership,
            },
          })
          .error(`Template not found for role ${membership.role}`)

        continue
      }

      logger.child({ context: { notification, channels } }).info('Sending')

      try {
        await notificationRepository.createNotification({
          notification: {
            notificationWorkflowId,
            channels,
            membershipId: member.membershipId,
            notificationTopicId: topic.id,
          },
        })
      } catch (error) {
        throw new Error('Failed to create notification')
      }
    }
  }

export { makeMethod }
