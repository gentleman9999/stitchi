import { objectType } from 'nexus'

export const DesignProductColor = objectType({
  name: 'DesignProductColor',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('catalogProductColorId')
    t.nonNull.id('designRequestProductId')

    t.nullable.string('name')
    t.nullable.string('hex')

    t.nonNull.list.nonNull.id('imageFileIds')

    // t.nonNull.string('rgb')
    // t.nonNull.string('cmyk')
    // t.nonNull.string('pms')
  },
})
