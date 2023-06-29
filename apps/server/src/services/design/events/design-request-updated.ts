import {
  ConversationService,
  makeClient as makeConversationServiceClient,
} from '../../conversation'
import { DesignRequestStatus } from '../db/design-request-table'
import { DesignFactoryDesignRequest } from '../factory'

export interface DesignRequestUpdatedEventPayload {
  prevDesignRequest: DesignFactoryDesignRequest
  nextDesignRequest: DesignFactoryDesignRequest
}

interface MakeHandlerParams {
  conversationClient: ConversationService
}

interface DesignRequestUpdatedHandler {
  (payload: DesignRequestUpdatedEventPayload): Promise<void>
}

const makeHandler =
  (
    { conversationClient }: MakeHandlerParams = {
      conversationClient: makeConversationServiceClient(),
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

        if (!conversation) {
          // Can't add mesage
          return
        }
      } catch (error) {
        console.error(error)
        throw new Error('Failed to get conversation')
      }

      try {
        conversationClient.updateConversation({
          conversation: {
            id: conversation.id,
            messages: [
              ...conversation.messages,
              {
                senderUserId: null,
                message: `👋 Hey there, thanks for submitting your design request! 🎨 Your request has been received and one of our talented artists will review it shortly. Feel free to drop any additional details or inspiration in this chat. We'll reach out to you here as soon as we have an update or if we need any further information. Let's create something amazing together!`,
                files: [],
              },
            ],
          },
        })
      } catch (error) {
        console.error(error)
        throw new Error('Failed to update conversation')
      }
    }
  }

export { makeHandler }
