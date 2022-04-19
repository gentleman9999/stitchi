import { arg, inputObjectType, mutationField, nonNull, objectType } from 'nexus'

export const ColorCreateInput = inputObjectType({
  name: 'ColorCreateInput',
  definition(t) {
    t.nonNull.field('name', { type: 'String' })
    t.nonNull.field('hex', { type: 'String' })
  },
})

export const ColorCreatePayload = objectType({
  name: 'ColorCreatePayload',
  definition(t) {
    t.nonNull.field('color', { type: 'Color' })
  },
})

export const colorCreate = mutationField('colorCreate', {
  description: 'Creates a new color',
  type: 'ColorCreatePayload',
  args: {
    input: nonNull(arg({ type: 'ColorCreateInput' })),
  },
  resolve: async (_, { input }, ctx) => {
    throw new Error('Not yet implemented')
  },
})
