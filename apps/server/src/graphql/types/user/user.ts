import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition: t => {
    t.id('id')
    t.string('email')
    t.boolean('emailVerified')
    t.string('username')
    t.string('phoneNumber')
    t.boolean('phoneVerified')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.string('picture')
    t.string('name')
    t.string('nickname')
    t.field('lastLogin', { type: 'DateTime' })
    t.int('loginsCount')
    t.string('givenName')
    t.string('familyName')
  },
})
