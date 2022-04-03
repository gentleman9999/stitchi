import { arg, inputObjectType, mutationField, nonNull, objectType } from 'nexus'

export const MaterialCreateInput = inputObjectType({
  name: 'MaterialCreateInput',
  definition(t) {
    t.nonNull.field('name', { type: 'String' })
    t.list.nonNull.field('variants', { type: 'MaterialVariantCreateInput' })
    t.field('slug', { type: 'String' })
  },
})

export const MaterialCreatePayload = objectType({
  name: 'MaterialCreatePayload',
  definition(t) {
    t.nonNull.field('material', { type: 'Material' })
  },
})

export const materialCreate = mutationField('materialCreate', {
  description: 'Creates a new product',
  type: 'MaterialCreatePayload',
  args: {
    input: nonNull(arg({ type: 'MaterialCreateInput' })),
  },
  resolve: async (_, { input }, ctx) => {
    throw new Error('Not yet implemented')
  },
})
