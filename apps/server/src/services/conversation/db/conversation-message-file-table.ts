import * as yup from 'yup'
import {
  PrismaClient,
  ConversationMessageFile as ConversationMessageFileSchema,
} from '@prisma/client'

export const ConversationMessageFile: yup.ObjectSchema<ConversationMessageFileSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      conversationId: yup.string().uuid().required(),
      conversationMessageId: yup.string().uuid().required(),
      fileId: yup.string().uuid().required(),
    })
    .label('Conversation Message File')

export type ConversationMessageFileRecord = yup.Asserts<
  typeof ConversationMessageFile
>

export const table = (db: PrismaClient) => db.conversationMessageFile

export type ConversationMessageFileTable = ReturnType<typeof table>
