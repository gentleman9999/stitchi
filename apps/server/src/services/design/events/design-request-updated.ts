import { logger } from '../../../telemetry'
import {
  ConversationService,
  makeClient as makeConversationServiceClient,
} from '../../conversation'
import {
  NotificationClientService,
  makeClient as makeNotificationClientServiceClient,
} from '../../notification'
// import { NotificationRecordType } from '../../notification/db/notification-table'
import { DesignRequestStatus } from '../db/design-request-table'
import { DesignFactoryDesignRequest } from '../factory'

export interface DesignRequestUpdatedEventPayload {
  prevDesignRequest: DesignFactoryDesignRequest
  nextDesignRequest: DesignFactoryDesignRequest
}

interface MakeHandlerParams {
  conversationClient: ConversationService
  notificationClient: NotificationClientService
}

interface DesignRequestUpdatedHandler {
  (payload: DesignRequestUpdatedEventPayload): Promise<void>
}

const makeHandler =
  (
    { conversationClient, notificationClient }: MakeHandlerParams = {
      conversationClient: makeConversationServiceClient(),
      notificationClient: makeNotificationClientServiceClient(),
    },
  ): DesignRequestUpdatedHandler =>
  async ({ prevDesignRequest, nextDesignRequest }) => {
    if (
      prevDesignRequest.status === DesignRequestStatus.DRAFT &&
      nextDesignRequest.status === DesignRequestStatus.SUBMITTED
    ) {
      let conversation

      try {
        if (nextDesignRequest.conversationId) {
          conversation = await conversationClient.getConversation({
            conversationId: nextDesignRequest.conversationId,
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
              designRequest: nextDesignRequest,
            },
          })
          .error(
            `Conversation not found for design request ${nextDesignRequest.id}. This should not happen.`,
          )
      }
    }

    if (
      prevDesignRequest.status !== DesignRequestStatus.SUBMITTED &&
      nextDesignRequest.status === DesignRequestStatus.SUBMITTED
    ) {
      // try {
      //   await notificationClient.createNotificationGroup(
      //     NotificationRecordType.DESIGN_REQUEST_SUBMITTED,
      //     { designRequest: nextDesignRequest },
      //   )
      // } catch (error) {
      //   console.error('Failed to create notification group', {
      //     context: {
      //       error,
      //       designRequest: nextDesignRequest,
      //     },
      //   })
      //   throw new Error('Failed to create notification group')
      // }
    }
  }

export { makeHandler }
