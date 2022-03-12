import { arg, inputObjectType, mutationField, nonNull } from 'nexus'

export const userBootstrap = mutationField('userBoostrap', {
  description: 'Bootstraps a new user with necessary resources',
  type: 'User',
  args: {},
  resolve: async (_, { input }, ctx) => {
    return null
  },
})
