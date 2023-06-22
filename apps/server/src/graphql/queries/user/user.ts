import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import { auth0UserToGraphl } from '../../serializers/user'

export const UserExtendsConversationMessage = extendType({
  type: 'ConversationMessage',
  definition(t) {
    t.nullable.field('sender', {
      type: 'User',
      resolve: async (coversationMessage, _, ctx) => {
        let user

        try {
          user = await ctx.auth0.getUser({ id: coversationMessage.senderId })
        } catch (error) {
          console.error(error)
          throw new GraphQLError('Unable to fetch user')
        }

        return auth0UserToGraphl(user)
      },
    })
  },
})

export const UserExtendsMembership = extendType({
  type: 'Membership',
  definition(t) {
    t.field('user', {
      type: 'User',
      resolve: async (membership, _, ctx) => {
        let user

        try {
          user = await ctx.auth0.getUser({ id: membership.userId })
        } catch (error) {
          console.error(error)
          throw new GraphQLError('Unable to fetch user')
        }

        return auth0UserToGraphl(user)
      },
    })
  },
})

export const UserExtendsDesignRequestHistoryItemDesignRequestEvent = extendType(
  {
    type: 'DesignRequestHistoryItemDesignRequestEvent',
    definition(t) {
      t.nullable.field('user', {
        type: 'User',
        resolve: async (designRequestHistoryItemDesignRequestEvent, _, ctx) => {
          if (!designRequestHistoryItemDesignRequestEvent.userId) return null

          let user

          try {
            user = await ctx.auth0.getUser({
              id: designRequestHistoryItemDesignRequestEvent.userId,
            })
          } catch (error) {
            console.error(error)
            throw new GraphQLError('Unable to fetch user')
          }

          return auth0UserToGraphl(user)
        },
      })
    },
  },
)

export const UserExtendsOrder = extendType({
  type: 'Order',
  definition(t) {
    t.field('user', {
      type: 'User',
      resolve: async (order, _, ctx) => {
        if (!order.userId) return null

        let user

        try {
          user = await ctx.auth0.getUser({ id: order.userId })
        } catch (error) {
          console.error(error)
          throw new GraphQLError('Unable to fetch user')
        }

        return auth0UserToGraphl(user)
      },
    })
  },
})

export const UserExtendsDesignRequest = extendType({
  type: 'DesignRequest',
  definition(t) {
    t.field('user', {
      type: 'User',
      resolve: async (designRequest, _, ctx) => {
        if (!designRequest.userId) return null

        let user

        try {
          user = await ctx.auth0.getUser({ id: designRequest.userId })
        } catch (error) {
          console.error(error)
          throw new GraphQLError('Unable to fetch user')
        }

        return auth0UserToGraphl(user)
      },
    })
  },
})

export const UserExtendsDesignRequestProof = extendType({
  type: 'DesignRequestProof',
  definition(t) {
    t.field('artist', {
      type: 'User',
      resolve: async (designRequestProof, _, ctx) => {
        let user

        try {
          user = await ctx.auth0.getUser({
            id: designRequestProof.artistUserId,
          })
        } catch (error) {
          console.error(error)
          throw new GraphQLError('Unable to fetch user')
        }

        return auth0UserToGraphl(user)
      },
    })
  },
})
