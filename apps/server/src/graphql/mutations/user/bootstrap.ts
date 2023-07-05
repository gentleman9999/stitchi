import { ApolloError } from 'apollo-server-core'
import { mutationField } from 'nexus'

export const userBootstrap = mutationField('userBoostrap', {
  description: 'Bootstraps a new user with necessary resources',
  type: 'User',
  resolve: async (_, __, ctx) => {
    if (!ctx.userId) {
      throw new Error('User not authenticated')
    }

    console.info('Starting to bootstrap user')

    const user = await ctx.user.getUser({ id: ctx.userId }).catch(error => {
      console.error(error)
      throw new ApolloError('Failed to get user from Auth0')
    })

    if (
      await ctx.prisma.membership.findFirst({ where: { userId: ctx.userId } })
    ) {
      // do nothing
    } else {
      await ctx.prisma.membership.create({
        data: {
          userId: ctx.userId,
          role: 'OWNER',
          organization: {
            create: {
              name: `Default Organization`,
              role: 'CUSTOMER',
            },
          },
        },
      })
    }

    console.info(`Successfully bootstrapped user ${ctx.userId}`)

    return { ...user, id: user.user_id }
  },
})
