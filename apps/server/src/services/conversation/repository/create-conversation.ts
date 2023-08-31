import { PrismaClient } from '@prisma/client'
import * as yup from 'yup'
import { logger } from '../../../telemetry'
import { Conversation, ConversationTable } from '../db/conversation-table'
import {
  conversationFactory,
  ConversationFactoryConversation,
} from '../factory'

const conversationSchema = Conversation.omit(['id', 'createdAt', 'updatedAt'])

const prisma = new PrismaClient()

interface CreateConversationConfig {
  conversationTable: ConversationTable
}

export interface CreateConversationFnInput {
  conversation: yup.Asserts<typeof conversationSchema>
}

type CreateConveresationFn = (
  input: CreateConversationFnInput,
) => Promise<ConversationFactoryConversation>

type MakeCreateConversationFn = (
  config?: CreateConversationConfig,
) => CreateConveresationFn

const makeCreateConversation: MakeCreateConversationFn =
  ({ conversationTable } = { conversationTable: prisma.conversation }) =>
  async input => {
    const validInput = await conversationSchema.validate(input.conversation)

    let conversation

    try {
      conversation = await conversationTable.create({
        data: validInput,
        include: {
          conversationMessageFiles: true,
          conversationMessages: {
            include: {
              conversationMessageFiles: true,
            },
          },
        },
      })
    } catch (error) {
      logger.error(error)
      throw new Error('Unable to create conversation')
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

export default makeCreateConversation
