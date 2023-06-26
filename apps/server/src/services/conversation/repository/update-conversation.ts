import { Conversation, ConversationTable } from '../db/conversation-table'
import * as yup from 'yup'
import { ConversationMessage } from '../db/conversation-message-table'
import { ConversationMessageFile } from '../db/conversation-message-file-table'
import { PrismaClient } from '@prisma/client'
import {
  conversationFactory,
  ConversationFactoryConversation,
} from '../factory'

const conversationMessageFileSchema = ConversationMessageFile.omit([
  'id',
  'conversationId',
  'conversationMessageId',
])

const conversationMessageSchema = ConversationMessage.omit([
  'id',
  'conversationId',
  'createdAt',
  'updatedAt',
]).concat(
  yup.object().shape({
    // If null, create, otherwise update
    id: yup.string().uuid().optional(),
    files: yup.array(conversationMessageFileSchema.required()).required(),
  }),
)

const inputSchema = Conversation.omit(['createdAt', 'updatedAt']).concat(
  yup.object().shape({
    messages: yup.array().of(conversationMessageSchema.required()).required(),
  }),
)

const prisma = new PrismaClient()

interface UpdateConversationConfig {
  conversationTable: ConversationTable
}

export interface UpdateConversationFnInput {
  conversation: yup.Asserts<typeof inputSchema>
}

type UpdateConversationFn = (
  input: UpdateConversationFnInput,
) => Promise<ConversationFactoryConversation>

type MakeUpdateConversationFn = (
  config?: UpdateConversationConfig,
) => UpdateConversationFn

const makeUpdateConversation: MakeUpdateConversationFn =
  ({ conversationTable } = { conversationTable: prisma.conversation }) =>
  async input => {
    const validInput = await inputSchema.validate(input.conversation)

    let existingConversation

    try {
      existingConversation = await conversationTable.findUnique({
        where: {
          id: validInput.id,
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

      if (!existingConversation) {
        throw new Error('Conversation not found')
      }
    } catch (error) {
      console.error(error)
      throw new Error('Unable to find conversation')
    }

    const { messages, ...conversation } = validInput

    const messagesToCreate = messages.filter(({ id }) => !id)
    const messagesToUpdate = messages.filter(({ id }) => id)

    const existingConversationHack = { ...existingConversation }

    let updatedConversation

    try {
      updatedConversation = await conversationTable.update({
        where: {
          id: conversation.id,
        },
        data: {
          conversationMessages: {
            create: messagesToCreate.map(({ files, id, ...message }) => ({
              ...message,
              conversationMessageFiles: {
                create: files.map(({ fileId }) => ({
                  fileId,
                  conversationId: conversation.id,
                })),
              },
            })),
            update: messagesToUpdate.map(({ files, id, ...message }) => {
              const currentMessage =
                existingConversationHack?.conversationMessages.find(
                  ({ id: messageId }) => messageId === id,
                )

              const filesToCreate = files.filter(
                ({ fileId }) =>
                  !currentMessage?.conversationMessageFiles.find(
                    ({ fileId: currentFileId }) => currentFileId === fileId,
                  ),
              )

              const filesToDelete =
                currentMessage?.conversationMessageFiles.filter(
                  ({ fileId }) =>
                    !files.find(
                      ({ fileId: currentFileId }) => currentFileId === fileId,
                    ),
                )

              return {
                where: {
                  id,
                },
                data: {
                  senderUserId: message.senderUserId,
                  message: message.message,
                  conversationMessageFiles: {
                    create: filesToCreate.map(({ fileId }) => ({
                      fileId,
                      conversationId: conversation.id,
                    })),
                    deleteMany: filesToDelete?.map(({ id }) => ({
                      id,
                    })),
                  },
                },
              }
            }),
          },
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
    } catch (error) {
      console.error(error)
      throw new Error('Unable to update conversation')
    }

    return conversationFactory({
      conversation: updatedConversation,
      files: updatedConversation.conversationMessageFiles,
      messages: updatedConversation.conversationMessages.map(
        ({ conversationMessageFiles, ...conversationMessage }) => ({
          ...conversationMessage,
          files: conversationMessageFiles,
        }),
      ),
    })
  }

export default makeUpdateConversation
