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
    createConversation: conversationRepository.createConversation,
    updateConversation: conversationRepository.updateConversation,
    getConversation: conversationRepository.getConversation,
  }
}

export { makeClient }
