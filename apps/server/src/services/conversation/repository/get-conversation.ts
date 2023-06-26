import { PrismaClient } from '@prisma/client'
import { ConversationTable } from '../db/conversation-table'
import {
  ConversationFactoryConversation,
  conversationFactory,
} from '../factory'

const primsa = new PrismaClient()

interface GetConversationConfig {
  conversationTable: ConversationTable
}

export interface GetConversationFnInput {
  conversationId: string
}

type GetConversationFn = (
  input: GetConversationFnInput,
) => Promise<ConversationFactoryConversation>

type MakeGetConversationFn = (
  config?: GetConversationConfig,
) => GetConversationFn

const makeGetConversation: MakeGetConversationFn =
  ({ conversationTable } = { conversationTable: primsa.conversation }) =>
  async input => {
    const conversation = await conversationTable.findFirst({
      where: {
        id: input.conversationId,
      },
      include: {
        conversationMessageFiles: true,
        conversationMessages: {
          include: {
            conversationMessageFiles: true,
          },
        },
      },
    })

    if (!conversation) {
      throw new Error(`Conversation proof not found: ${input}`)
    }

    return conversationFactory({
      conversation,
      files: conversation.conversationMessageFiles,
      messages: conversation.conversationMessages.map(
        ({ conversationMessageFiles, ...conversationMessage }) => ({
          ...conversationMessage,
          files: conversationMessageFiles,
        }),
      ),
    })
  }

export default makeGetConversation
