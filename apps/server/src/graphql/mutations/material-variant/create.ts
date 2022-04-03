import { inputObjectType } from 'nexus'

export const MaterialVariantCreateInput = inputObjectType({
  name: 'MaterialVariantCreateInput',
  definition(t) {
    t.string('vendorPartNumber')
    t.string('gtin')
    t.string('sizeId')
    t.string('colorId')
  },
})
