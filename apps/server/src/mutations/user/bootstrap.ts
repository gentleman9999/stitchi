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

    if (
      await ctx.prisma.membership.findFirst({ where: { userId: ctx.userId } })
    ) {
      console.info('Could not bootstrap user, membership already exists')
      return null
    }

    const user = await ctx.auth0.getUser({ id: ctx.userId }).catch(error => {
      console.error(error)
      throw new ApolloError('Failed to get user from Auth0')
    })

    await ctx.prisma.membership.create({
      data: {
        userId: ctx.userId,
        role: 'OWNER',
        organization: {
          create: {
            name: `${user.name} - Default Organization`,
            role: 'CUSTOMER',
          },
        },
      },
    })

    console.info(`Successfully bootstrapped user ${ctx.userId}`)

    return { ...user, id: user.user_id }
  },
})
