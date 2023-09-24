import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { designRequestFactoryToGrahpql } from '../../../serializers/design'

export const DesignRequestAssignPayload = objectType({
  name: 'DesignRequestAssignPayload',
  definition(t) {
    t.field('designRequest', {
      type: 'DesignRequest',
    })
  },
})

export const DesignRequestAssignInput = inputObjectType({
  name: 'DesignRequestAssignInput',
  definition(t) {
    t.nonNull.string('designRequestId')
    t.nonNull.string('membershipId')
  },
})

export const designRequestAssign = mutationField('designRequestAssign', {
  type: 'DesignRequestAssignPayload',
  args: {
    input: nonNull('DesignRequestAssignInput'),
  },
  resolve: async (_, { input }, ctx) => {
    // TODO: Implement authoization check

    const designRequest = await ctx.design.getDesignRequest({
      designRequestId: input.designRequestId,
    })

    const membership = await ctx.membership.getMembership({
      membershipId: input.membershipId,
    })

    const updatedDesignRequest = await ctx.design.updateDesignRequest({
      designRequest: {
        ...designRequest,
        artists: [
          ...designRequest.artists,
          {
            artistMembershipId: membership.id,
            isActive: true,
          },
        ],
      },
    })

    return {
      designRequest: designRequestFactoryToGrahpql(updatedDesignRequest),
    }
  },
})
