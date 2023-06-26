import makeCreateConversation from './create-conversation'
import makeGetConversation from './get-conversation'
import makeUpdateConversation from './update-conversation'

export interface ConversationRepositoryInit {}

export interface ConversationRepository {
  createConversation: ReturnType<typeof makeCreateConversation>
  updateConversation: ReturnType<typeof makeUpdateConversation>
  getConversation: ReturnType<typeof makeGetConversation>
}

type MakeConversationRepositoryFn = (
  init?: ConversationRepositoryInit,
) => ConversationRepository

const makeConversationRepository: MakeConversationRepositoryFn = init => ({
  createConversation: makeCreateConversation(),
  updateConversation: makeUpdateConversation(),
  getConversation: makeGetConversation(),
})

export default makeConversationRepository
