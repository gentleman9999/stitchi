import { ConversationFactoryConversation } from '../../services/conversation/factory'
import { NexusGenObjects } from '../generated/nexus'

export const conversationFactoryToGraphQl = ({
  viewerId,
  conversation,
}: {
  viewerId?: string
  conversation: ConversationFactoryConversation
}): NexusGenObjects['Conversation'] => {
  return {
    id: conversation.id,
    messages: conversation.messages.map(message => ({
      id: message.id,
      conversationId: message.conversationId,
      senderMembershipId: message.senderMembershipId,
      message: message.message,
      fileIds: message.files.map(file => file.fileId),
      createdAt: message.createdAt,
      viewerIsSender: message.senderMembershipId === viewerId,
    })),
  }
}
