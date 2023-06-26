import { extendType } from 'nexus'
import { GraphQLError } from 'graphql'
import { designProofFactoryToGraphql } from '../../serializers/design'

export const DesignProofExtendsDesignRequest = extendType({
  type: 'DesignRequest',
  definition(t) {
    t.nonNull.list.nonNull.field('proofs', {
      type: 'DesignProof',
      args: {
        limit: 'Int',
      },
      resolve: async (parent, args, ctx) => {
        let designProofs

        try {
          designProofs = await ctx.design.listDesignProofs({
            where: {
              designRequestDesignProofs: {
                some: {
                  designProofId: {
                    in: parent.designProofIds,
                  },
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: args.limit || undefined,
          })
        } catch (error) {
          console.error(error)
          throw new GraphQLError('Unable to fetch design proofs')
        }

        return designProofs.map(designProofFactoryToGraphql)
      },
    })
  },
})
