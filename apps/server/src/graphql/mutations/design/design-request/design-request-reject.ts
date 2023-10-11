import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { designRequestFactoryToGrahpql } from '../../../serializers/design'

export const DesignRequestRejectPayload = objectType({
  name: 'DesignRequestRejectPayload',
  definition(t) {
    t.field('designRequest', {
      type: 'DesignRequest',
    })
  },
})

export const DesignRequestRejectInput = inputObjectType({
  name: 'DesignRequestRejectInput',
  definition(t) {
    t.nonNull.string('designRequestId')
    t.nonNull.string('message')
  },
})

export const designRequestReject = mutationField('designRequestReject', {
  type: 'DesignRequestRejectPayload',
  args: {
    input: nonNull('DesignRequestRejectInput'),
  },
  resolve: async (_, { input }, ctx) => {
    const scope = ctx.authorize('CREATE', 'DesignProof')

    if (!scope || !ctx.membershipId) {
      throw new GraphQLError('Unauthorized')
    }

    let designRequest

    try {
      designRequest = await ctx.design.getDesignRequest({
        designRequestId: input.designRequestId,
      })
    } catch (error) {
      throw new GraphQLError('Unable to fetch design request')
    }

    let updatedDesignRequest

    try {
      updatedDesignRequest = await ctx.design.updateDesignRequest({
        designRequest: {
          ...designRequest,
          status: 'REJECTED',
        },
      })
    } catch (error) {
      throw new GraphQLError('Unable to update design request')
    }

    if (input.message.length && updatedDesignRequest.conversationId) {
      let convo

      try {
        convo = await ctx.conversation.getConversation({
          conversationId: updatedDesignRequest.conversationId,
        })
      } catch (error) {
        throw new GraphQLError('Unable to create conversation')
      }

      try {
        await ctx.conversation.updateConversation({
          conversation: {
            id: updatedDesignRequest.conversationId,
            messages: [
              ...convo.messages,
              {
                senderMembershipId: ctx.membershipId,
                message: input.message,
                files: [],
              },
            ],
          },
        })
      } catch (error) {
        throw new GraphQLError('Unable to update conversation')
      }
    } else {
      ctx.logger
        .child({
          designRequest: updatedDesignRequest,
        })
        .error(
          'Design request does not have associated conversation. This should not happen.',
        )
    }

    return {
      designRequest: designRequestFactoryToGrahpql(updatedDesignRequest),
    }
  },
})
