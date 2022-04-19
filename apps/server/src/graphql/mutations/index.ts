import { mutationType } from 'nexus'

export * from './user'
export * from './material'
export * from './material-variant'
export * from './color'
export * from "./size"

export const Mutation = mutationType({
  definition: () => {},
})
