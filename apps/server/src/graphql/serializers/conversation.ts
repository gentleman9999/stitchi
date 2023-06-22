import { NexusGenObjects } from '../generated/nexus'

export const conversationMessageFactoryToGraphQl = ({
  index,
  viewerId,
}: {
  index: number
  viewerId?: string
}): NexusGenObjects['ConversationMessage'] => {
  return {
    id: index.toString(),
    conversationId: 'conversationId',
    senderId: viewerId || '',
    content:
      'This is the message content of a conversation that is being sent to the client.',
    createdAt: new Date(),
    viewerIsSender: viewerId === viewerId,
  }
}
