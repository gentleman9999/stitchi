import { objectType } from 'nexus'

export const MailingAddress = objectType({
  name: 'MailingAddress',
  definition(t) {
    t.nonNull.id('id')
    t.string('userId')
    t.string('organizationId')
    t.string('name')
    t.string('phone')
    t.string('company')
    t.string('firstName')
    t.string('lastName')
    t.string('address1')
    t.string('address2')
    t.string('city')
    t.string('country')
    t.string('province')
    t.string('provinceCode')
    t.string('zip')
    t.float('latitude')
    t.float('longitude')
    t.nonNull.DateTime('createdAt')
    t.nonNull.DateTime('updatedAt')
  },
})
