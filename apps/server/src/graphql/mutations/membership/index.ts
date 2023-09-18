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
        const res = await ctx.membership.listMemberships({
          where: {
            organizationId: ctx.organizationId,
            userId: existingUser.user_id,
          },
        })

        if (res.length > 0) {
          console.warn(`User ${email} is already a member`)
          continue
        }
      } else {
        const res = await ctx.membership.listMemberships({
          where: {
            organizationId: ctx.organizationId,
            invitedEmail: email,
          },
        })

        if (res.length > 0) {
          console.warn(`User ${email} is already invited`)
          continue
        }
      }

      let membership

      try {
        membership = await ctx.membership.createMembership({
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
      } catch (error) {
        throw new GraphQLError('Failed to create membership')
      }

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

        try {
          await ctx.notification.sendAnonymousNotification(
            'membership:invited',
            {
              invitingUser,
              organization,
            },
            [
              {
                email: membership.invitedEmail,
              },
            ],
          )
        } catch (error) {
          throw new Error('Failed to send invitation email')
        }
      }
    }

    return { memberships: memberships.map(membershipFactoryToGraphql) }
  },
})
