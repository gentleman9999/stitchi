import { objectType } from 'nexus'

export const ConversationMessage = objectType({
  name: 'ConversationMessage',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('conversationId')
    t.nonNull.id('senderUserId')
    t.nonNull.string('message')
    t.nonNull.list.nonNull.id('fileIds')

    t.nonNull.boolean('viewerIsSender')

    t.nonNull.DateTime('createdAt')
  },
})
