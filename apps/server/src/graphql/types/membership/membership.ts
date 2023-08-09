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
    t.nonNull.string('userId')

    t.nonNull.field('flags', {
      type: 'MembershipFlags',
      resolve: async (membership, _, context) => {
        let user

        try {
          user = await context.user.getUser({ id: membership.userId })
        } catch (error) {
          console.error('Failed to get user', {
            context: { error, userId: membership.userId },
          })
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
          default:
            return null
        }
      },
    })

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})
