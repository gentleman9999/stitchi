import { objectType } from 'nexus'

export const MembershipInvite = objectType({
  name: 'MembershipInvite',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('membershipId')
    t.nonNull.id('organizationId')

    t.nullable.string('invitedEmail')
    t.nullable.string('organizationName')
  },
})
