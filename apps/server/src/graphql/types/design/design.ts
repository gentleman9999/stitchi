import { objectType } from 'nexus'

export const Design = objectType({
  name: 'Design',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('designRequestId')
    t.nonNull.id('catalogProductId')
    t.nullable.id('userId')
    t.nullable.id('organizationId')
    t.nullable.id('primaryImageFileId')

    t.nonNull.boolean('termsConditionsAgreed')

    t.nonNull.string('name')
    t.nullable.string('description')

    t.nonNull.DateTime('createdAt')
    t.nonNull.DateTime('updatedAt')
  },
})
