import { NotificationTopic, NotificationTopicMember } from '@prisma/client'

export interface NotificationFactoryNotificationTopicMember
  extends NotificationTopicMember {}

export interface NotificationFactoryNotificationTopic
  extends NotificationTopic {
  members: NotificationFactoryNotificationTopicMember[]
}

const notificationFactoryNotificationTopic = ({
  notificationTopicRecord,
  notificationTopicMemberRecords,
}: {
  notificationTopicRecord: NotificationTopic
  notificationTopicMemberRecords: NotificationTopicMember[]
}): NotificationFactoryNotificationTopic => {
  return {
    id: notificationTopicRecord.id,
    topicKey: notificationTopicRecord.topicKey,
    members: notificationTopicMemberRecords.map(member => ({
      id: member.id,
      membershipId: member.membershipId,
      notificationTopicId: member.notificationTopicId,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    })),
  }
}

export { notificationFactoryNotificationTopic }
