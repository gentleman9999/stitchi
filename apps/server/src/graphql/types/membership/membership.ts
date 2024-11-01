import { GraphQLError } from 'graphql'
import { objectType } from 'nexus'
import { getOrThrow } from '../../../utils'

const betaTesterEmailsString = getOrThrow(
  process.env.BETA_TESTER_EMAILS,
  'BETA_TESTER_EMAILS',
)

export const MembershipFlags = objectType({
  name: 'MembershipFlags',
  definition: t => {
    t.nonNull.boolean('isBetaTester')
  },
})

export const Membership = objectType({
  name: 'Membership',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.string('organizationId')
    t.nullable.string('userId')
    t.nullable.string('invitedEmail')

    t.nonNull.field('flags', {
      type: 'MembershipFlags',
      resolve: async (membership, _, context) => {
        if (!membership.userId) return { isBetaTester: false }

        let user

        try {
          user = await context.user.getUser({ id: membership.userId })
        } catch (error) {
          context.logger
            .child({
              context: { error, userId: membership.userId },
            })
            .error('Failed to get user')
          throw new GraphQLError('Failed to get user')
        }

        const isBetaTester = user.email
          ? betaTesterEmailsString
              .replace(' ', '')
              .split(',')
              .includes(user.email)
          : false

        return {
          isBetaTester,
        }
      },
    })

    t.field('role', { type: 'MembershipRole' })
    t.nullable.string('humanizedRole', {
      resolve: membership => {
        switch (membership.role) {
          case 'OWNER':
            return 'Owner'
          case 'STITCHI_DESIGNER':
            return 'Designer'
          case 'STITCHI_ADMIN':
            return 'Super Admin'
          default:
            throw new GraphQLError('Invalid membership role')
        }
      },
    })

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})
