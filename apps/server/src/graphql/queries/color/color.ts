import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import { colorFactoryToGrahpql } from '../../serializers/color'

export const ColorExtendsOrganizationBrand = extendType({
  type: 'OrganizationBrand',
  definition(t) {
    t.nonNull.list.nonNull.field('colors', {
      type: 'Color',
      resolve: async (parent, _, context) => {
        let colors

        try {
          colors = await context.organization.listOrganizationColors({
            organizationId: parent.organizationId,
          })
        } catch (error) {
          context.logger
            .child({
              context: { error, organizationBrand: parent },
            })
            .error(`Failed to get organization colors`)
          throw new GraphQLError('Failed to get organization colors')
        }

        return colors.map(colorFactoryToGrahpql)
      },
    })
  },
})
