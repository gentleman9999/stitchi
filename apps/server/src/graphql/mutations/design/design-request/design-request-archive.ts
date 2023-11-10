import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { designRequestFactoryToGrahpql } from '../../../serializers/design'

export const DesignRequestArchiveInput = inputObjectType({
  name: 'DesignRequestArchiveInput',
  definition(t) {
    t.nonNull.string('designRequestId')
  },
})

export const DesignRequestArchivePayload = objectType({
  name: 'DesignRequestArchivePayload',
  definition(t) {
    t.field('designRequest', {
      type: 'DesignRequest',
    })
  },
})

export const designRequestArchive = mutationField('designRequestArchive', {
  type: 'DesignRequestArchivePayload',
  args: {
    input: nonNull('DesignRequestArchiveInput'),
  },
  resolve: async (_, { input }, ctx) => {
    const scope = ctx.authorize('UPDATE', 'DesignRequest')

    if (!scope) {
      throw new GraphQLError('Forbidden')
    }

    let designRequest

    try {
      designRequest = await ctx.design.archiveDesignRequest({
        designRequestId: input.designRequestId,
      })
    } catch (error) {
      throw new GraphQLError('Unable to archive design request')
    }

    return {
      designRequest: designRequestFactoryToGrahpql(designRequest),
    }
  },
})
