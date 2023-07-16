import { GraphQLError } from 'graphql'
import { idArg, nonNull, queryField } from 'nexus'
import { designFactoryDesignToGraphql } from '../../serializers/design'

export const designV2 = queryField('designV2', {
  type: 'Design',
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_root, { id }, ctx) => {
    let design

    try {
      design = await ctx.design.getDesign({ designId: id })
    } catch (error) {
      console.error(error)
      throw new GraphQLError('Failed to get design')
    }

    return designFactoryDesignToGraphql(design)
  },
})
