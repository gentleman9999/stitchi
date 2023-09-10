import makeConversationRepository, {
  ConversationRepository,
} from './repository'

export interface ConversationService {
  createConversation: ConversationRepository['createConversation']
  updateConversation: ConversationRepository['updateConversation']
  getConversation: ConversationRepository['getConversation']
}

interface MakeClientParams {
  conversationRepository: ConversationRepository
}

type MakeClientFn = (params?: MakeClientParams) => ConversationService

const makeClient: MakeClientFn = (
  { conversationRepository } = {
    conversationRepository: makeConversationRepository(),
  },
) => {
  return {
    updateConversation: conversationRepository.updateConversation,
    getConversation: conversationRepository.getConversation,
    createConversation: async input => {
      let conversation

      try {
        conversation = await conversationRepository.createConversation({
          conversation: input.conversation,
        })
      } catch (error) {
        throw new Error('Failed to create conversation')
      }

      return conversation
    },
  }
}

export { makeClient }
