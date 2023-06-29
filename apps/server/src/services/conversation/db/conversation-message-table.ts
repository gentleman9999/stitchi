import * as yup from 'yup'
import {
  PrismaClient,
  ConversationMessage as ConversationMessageSchema,
} from '@prisma/client'

export const ConversationMessage: yup.ObjectSchema<ConversationMessageSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      senderUserId: yup.string().nullable().defined(),
      conversationId: yup.string().uuid().required(),

      message: yup.string().required(),

      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
    })
    .label('Design Request Revision')

export type ConversationMessageRecord = yup.Asserts<typeof ConversationMessage>

export const table = (db: PrismaClient) => db.conversationMessage

export type ConversationMessageTable = ReturnType<typeof table>
