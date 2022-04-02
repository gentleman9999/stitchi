import { mutationType } from 'nexus'

export * from './user'
export * from './material'
export * from './material-variant'

export const Mutation = mutationType({
  definition: () => {},
})
