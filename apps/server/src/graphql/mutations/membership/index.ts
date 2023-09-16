import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { membershipFactoryToGraphql } from '../../serializers/membership'

export const MembershipInviteInput = inputObjectType({
  name: 'MembershipInviteInput',
  definition(t) {
    t.nonNull.list.nonNull.string('emails')
  },
})

export const MembershipInvitePayload = objectType({
  name: 'MembershipInvitePayload',
  definition(t) {
    t.nonNull.list.nonNull.field('memberships', { type: 'Membership' })
  },
})

export const membershipInvite = mutationField('membershipInvite', {
  type: 'MembershipInvitePayload',
  args: {
    input: nonNull('MembershipInviteInput'),
  },
  resolve: async (_, { input }, ctx) => {
    if (!ctx.organizationId || !ctx.userId) {
      throw new GraphQLError('Forbidden')
    }

    const memberships = []

    for (const email of input.emails) {
      let existingUser

      try {
        existingUser = await ctx.user.getUserByEmail(email)
      } catch (error) {
        throw new GraphQLError('Failed to get user by email')
      }

      if (existingUser) {
        let existingMembership

        try {
          const res = await ctx.membership.listMemberships({
            where: {
              organizationId: ctx.organizationId,
              userId: existingUser.user_id,
            },
          })

          existingMembership = res[0]
        } catch (error) {
          throw new GraphQLError('Failed to list memberships')
        }

        if (existingMembership) {
          throw new GraphQLError('User is already a member')
        }
      }

      try {
        const membership = await ctx.membership.createMembership({
          membership: {
            invitedEmail: email,
            invitedName: null,
            organizationId: ctx.organizationId,
            role: 'OWNER',
            // Do not assign user ID until user accepts invitation
            userId: null,
          },
        })

        memberships.push(membership)

        if (!membership.userId) {
          // This is an invited user, send email

          if (!membership.invitedEmail) {
            throw new Error('Invited email is required')
          }

          let invitingUser

          try {
            invitingUser = await ctx.user.getUser({
              id: ctx.userId,
            })
          } catch (error) {
            throw new Error('Failed to get inviting user')
          }

          let organization

          try {
            organization = await ctx.organization.getOrganization({
              organizationId: ctx.organizationId,
            })
          } catch (error) {
            throw new Error('Failed to get organization')
          }

          throw new Error('TODO: IMPLEMENT')

          try {
            await ctx.notification.sendNotification(
              'membership:invited',
              {
                invitingUser,
                organization,
              },
              {
                topicKey: 'TODO',
              },
            )
          } catch (error) {
            throw new Error('Failed to send invitation email')
          }
        }
      } catch (error) {
        throw new GraphQLError('Failed to create membership')
      }
    }

    return { memberships: memberships.map(membershipFactoryToGraphql) }
  },
})
