import { ConversationMessageFileRecord } from './db/conversation-message-file-table'
import { ConversationMessageRecord } from './db/conversation-message-table'
import { ConversationRecord } from './db/conversation-table'

interface ConversationFactoryConversationMessageFile
  extends ConversationMessageFileRecord {}

interface ConversationFactoryConversationMessage
  extends ConversationMessageRecord {
  files: ConversationFactoryConversationMessageFile[]
}

export interface ConversationFactoryConversation extends ConversationRecord {
  messages: ConversationFactoryConversationMessage[]
  files: ConversationFactoryConversationMessageFile[]
}

export const conversationFactory = ({
  conversation,
  messages,
  files,
}: {
  conversation: ConversationRecord
  files: ConversationMessageFileRecord[]
  messages: (ConversationMessageRecord & {
    files: ConversationMessageFileRecord[]
  })[]
}): ConversationFactoryConversation => {
  return {
    messages,
    files,
    id: conversation.id,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
  }
}
