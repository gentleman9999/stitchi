import * as yup from 'yup'
import {
  PrismaClient,
  Conversation as ConversationSchema,
} from '@prisma/client'

export const Conversation: yup.ObjectSchema<ConversationSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('Design Request Revision')

export type ConversationRecord = yup.Asserts<typeof Conversation>

export const table = (db: PrismaClient) => db.conversation

export type ConversationTable = ReturnType<typeof table>
