import { NexusGenObjects } from '../generated/nexus'

export const conversationMessageFactoryToGraphQl = (
  index: number,
): NexusGenObjects['ConversationMessage'] => {
  return {
    id: index.toString(),
    conversationId: 'conversationId',
    senderId: 'google-oauth2|116366708093057101901',
    content:
      'This is the message content of a conversation that is being sent to the client.',
    createdAt: new Date(),
  }
}
