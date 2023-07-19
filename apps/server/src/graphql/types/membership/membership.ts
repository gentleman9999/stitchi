import { objectType } from 'nexus'

export const Membership = objectType({
  name: 'Membership',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.string('organizationId')
    t.nonNull.string('userId')
    t.field('role', { type: 'MembershipRole' })
    t.nullable.string('humanizedRole', {
      resolve: membership => {
        switch (membership.role) {
          case 'OWNER':
            return 'Owner'
          case 'STITCHI_DESIGNER':
            return 'Designer'
          default:
            return null
        }
      },
    })

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})
