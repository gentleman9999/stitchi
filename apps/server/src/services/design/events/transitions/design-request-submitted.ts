import { logger } from '../../../../telemetry'
import { ConversationService } from '../../../conversation'
import { MembershipService } from '../../../membership'
import { NotificationClientService } from '../../../notification'
import { UserService } from '../../../user'
import { DesignFactoryDesignRequest } from '../../factory'

export const designRequestSubmitted = async (
  designRequest: DesignFactoryDesignRequest,
  {
    conversationClient,
    notificationClient,
    userClient,
    membershipClient,
  }: {
    conversationClient: ConversationService
    notificationClient: NotificationClientService
    userClient: UserService
    membershipClient: MembershipService
  },
) => {
  let conversation

  try {
    if (designRequest.conversationId) {
      conversation = await conversationClient.getConversation({
        conversationId: designRequest.conversationId,
      })
    }
  } catch (error) {
    logger.error(error)
    throw new Error('Failed to get conversation')
  }

  if (conversation) {
    try {
      conversationClient.updateConversation({
        conversation: {
          id: conversation.id,
          messages: [
            ...conversation.messages,
            {
              senderMembershipId: null,
              message: `👋 Hey there, thanks for submitting your design request! 🎨 Your request has been received and one of our talented artists will review it shortly. Feel free to drop any additional details or inspiration in this chat. We'll reach out to you here as soon as we have an update or if we need any further information. Let's create something amazing together!`,
              files: [],
            },
          ],
        },
      })
    } catch (error) {
      logger.error(error)
      throw new Error('Failed to update conversation')
    }
  } else {
    logger
      .child({
        context: {
          designRequest: designRequest,
        },
      })
      .error(
        `Conversation not found for design request ${designRequest.id}. This should not happen.`,
      )
  }

  if (!designRequest.membershipId) {
    logger
      .child({
        context: {
          designRequest: designRequest,
        },
      })
      .error(
        `Membership not found for submitted design request ${designRequest.id}. This should not happen.`,
      )
    return
  }

  let membership

  try {
    membership = await membershipClient.getMembership({
      membershipId: designRequest.membershipId,
    })

    if (!membership) {
      logger
        .child({
          context: {
            designRequest: designRequest,
          },
        })
        .error(
          `Membership not found for submitted design request ${designRequest.id}. This should not happen.`,
        )
      return
    }
  } catch (error) {
    logger.error(error)
    throw new Error('Failed to get membership')
  }

  if (!membership.userId) {
    logger
      .child({
        context: {
          designRequest: designRequest,
        },
      })
      .error(
        `User not found for submitted design request ${designRequest.id}. This should not happen.`,
      )
    return
  }

  let designRequester

  try {
    designRequester = await userClient.getUser({
      id: membership.userId,
    })
  } catch (error) {
    logger.error(error)
    throw new Error('Failed to get user')
  }

  try {
    await notificationClient.sendNotification(
      'designRequest:submitted:user',
      {
        designRequest,
        designRequester,
      },
      {
        topicKey: `designRequest:${designRequest.id}`,
      },
    )
  } catch (error) {
    throw new Error('Failed to create design request submitted notification')
  }
}
