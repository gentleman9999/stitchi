import { objectType } from 'nexus'

export const Color = objectType({
  name: 'Color',
  definition(t) {
    t.nonNull.string('id')

    t.nonNull.string('name')

    t.nonNull.string('hex')
    t.nullable.string('pantone')

    t.nullable.int('cmykC')
    t.nullable.int('cmykM')
    t.nullable.int('cmykY')
    t.nullable.int('cmykK')
  },
})
