import { extendType, nonNull } from 'nexus'
import { GraphQLError } from 'graphql'
import { designProofFactoryToGraphql } from '../../serializers/design'

export const DesignProofExtendsDesignRequest = extendType({
  type: 'DesignRequest',
  definition(t) {
    t.nullable.field('approvedProof', {
      type: 'DesignProof',
      resolve: async (parent, _, ctx) => {
        if (!parent.approvedDesignProofId) {
          return null
        }

        let designProof

        try {
          designProof = await ctx.design.getDesignProof({
            designProofId: parent.approvedDesignProofId,
          })
        } catch (error) {
          console.error(error)
          throw new GraphQLError('Unable to fetch approved proof')
        }

        return designProofFactoryToGraphql(designProof)
      },
    })

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

export const DesignProofExtendsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('designProof', {
      type: 'DesignProof',
      args: {
        id: nonNull('ID'),
      },
      resolve: async (_, args, ctx) => {
        let designProof

        try {
          designProof = await ctx.design.getDesignProof({
            designProofId: args.id,
          })

          if (!designProof) {
            throw new Error('Design proof not found')
          }
        } catch (error) {
          console.error(error)
          throw new GraphQLError('Unable to fetch design proof')
        }

        return designProofFactoryToGraphql(designProof)
      },
    })
  },
})
