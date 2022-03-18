import { objectType } from 'nexus'

export const ImageUrl = objectType({
  name: 'ImageUrl',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('url')
    t.nonNull.int('width')
    t.nonNull.int('height')
  },
})
