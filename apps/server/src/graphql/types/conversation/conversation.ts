import { objectType } from 'nexus'

export const Conversation = objectType({
  name: 'Conversation',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.list.nonNull.field('messages', { type: 'ConversationMessage' })
  },
})
