import { arg, inputObjectType, mutationField, nonNull, objectType } from 'nexus'

export const SizeCreateInput = inputObjectType({
  name: 'SizeCreateInput',
  definition(t) {
    t.nonNull.field('name', { type: 'String' })
    t.nonNull.field('value', { type: 'String' })
  },
})

export const SizeCreatePayload = objectType({
  name: 'SizeCreatePayload',
  definition(t) {
    t.nonNull.field('size', { type: 'Size' })
  },
})

export const sizeCreate = mutationField('sizeCreate', {
  description: 'Creates a new size',
  type: 'SizeCreatePayload',
  args: {
    input: nonNull(arg({ type: 'SizeCreateInput' })),
  },
  resolve: async (_, { input }, ctx) => {
    throw new Error('Not yet implemented')
  },
})
