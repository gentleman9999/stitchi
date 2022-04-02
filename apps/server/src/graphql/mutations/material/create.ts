import { arg, inputObjectType, mutationField, nonNull } from 'nexus'

export const MaterialCreateInput = inputObjectType({
  name: 'MaterialCreateInput',
  definition(t) {
    t.nonNull.field('name', { type: 'String' })
    t.list.nonNull.field('variants', { type: 'MaterialVariantCreateInput' })
    t.field('slug', { type: 'String' })
  },
})

export const materialCreate = mutationField('materialCreate', {
  description: 'Creates a new product',
  type: 'Material',
  args: {
    input: nonNull(arg({ type: 'MaterialCreateInput' })),
  },
  resolve: async (_, { input }, ctx) => {
    throw new Error('Not yet implemented')
  },
})
