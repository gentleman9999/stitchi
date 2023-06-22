import { objectType } from 'nexus'

export const ConversationMessage = objectType({
  name: 'ConversationMessage',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('conversationId')
    t.nonNull.id('senderId')
    t.nonNull.string('content')
    t.nonNull.boolean('viewerIsSender')

    t.nonNull.DateTime('createdAt')
  },
})
