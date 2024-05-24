import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { KeyValueRecordKey } from '../../../services/key-value-store'
import { membershipFactoryToGraphql } from '../../serializers/membership'

export const MembershipInviteAcceptInput = inputObjectType({
  name: 'MembershipInviteAcceptInput',
  definition(t) {
    t.nonNull.string('membershipId')
  },
})

export const MembershipInviteAcceptPayload = objectType({
  name: 'MembershipInviteAcceptPayload',
  definition(t) {
    t.nonNull.field('membership', { type: 'Membership' })
  },
})

export const membershipInviteAccept = mutationField('membershipInviteAccept', {
  type: 'MembershipInviteAcceptPayload',
  args: {
    input: nonNull('MembershipInviteAcceptInput'),
  },
  resolve: async (_, { input }, ctx) => {
    if (!ctx.userId) {
      throw new GraphQLError('Forbidden')
    }

    let user

    try {
      user = await ctx.user.getUser({
        id: ctx.userId,
      })
    } catch (error) {
      throw new GraphQLError('Failed to get user')
    }

    let membership

    try {
      membership = await ctx.membership.acceptMembershipInvite({
        user,
        membershipId: input.membershipId,
      })
    } catch (error) {
      throw new GraphQLError('Failed to update membership')
    }

    // Once a user accepts the invitation, we want to set their active membership to this one
    try {
      await ctx.membership.setUserActiveMembership({
        membershipId: membership.id,
        organizationId: membership.organizationId,
        userId: ctx.userId,
      })
    } catch (error) {
      throw new GraphQLError('Failed to set user active membership')
    }

    return {
      membership: membershipFactoryToGraphql(membership),
    }
  },
})

export const MembershipInviteResendInput = inputObjectType({
  name: 'MembershipInviteResendInput',
  definition(t) {
    t.nonNull.string('membershipId')
  },
})

export const MembershipInviteResendPayload = objectType({
  name: 'MembershipInviteResendPayload',
  definition(t) {
    t.nonNull.field('membership', { type: 'Membership' })
  },
})

export const membershipInviteResend = mutationField('membershipInviteResend', {
  type: 'MembershipInviteResendPayload',
  args: {
    input: nonNull('MembershipInviteResendInput'),
  },
  resolve: async (_, { input }, ctx) => {
    if (!ctx.organizationId || !ctx.userId) {
      throw new GraphQLError('Forbidden')
    }

    let membership

    try {
      membership = await ctx.membership.getMembership({
        membershipId: input.membershipId,
      })
    } catch (error) {
      throw new GraphQLError('Failed to get membership')
    }

    let organization

    try {
      organization = await ctx.organization.getOrganization({
        organizationId: membership.organizationId,
      })
    } catch (error) {
      throw new GraphQLError('Failed to get organization')
    }

    if (organization.id !== ctx.organizationId) {
      throw new GraphQLError('Forbidden')
    }

    if (!membership.invitedEmail) {
      throw new GraphQLError('Membership is not an invited user')
    }

    let invitingUser

    try {
      invitingUser = await ctx.user.getUser({
        id: ctx.userId,
      })
    } catch (error) {
      throw new GraphQLError('Failed to get inviting user')
    }

    try {
      await ctx.notification.sendAnonymousNotification(
        'membership:invited',
        {
          invitingUser,
          organization,
          membership,
        },
        [
          {
            email: membership.invitedEmail,
          },
        ],
      )
    } catch (error) {
      throw new GraphQLError('Failed to send invitation email')
    }

    return {
      membership: membershipFactoryToGraphql(membership),
    }
  },
})

export const MembershipInviteRevokeInput = inputObjectType({
  name: 'MembershipInviteRevokeInput',
  definition(t) {
    t.nonNull.string('membershipId')
  },
})

export const MembershipInviteRevokePayload = objectType({
  name: 'MembershipInviteRevokePayload',
  definition(t) {
    t.nonNull.field('membership', { type: 'Membership' })
  },
})

export const membershipInviteRevoke = mutationField('membershipInviteRevoke', {
  type: 'MembershipInviteRevokePayload',
  args: {
    input: nonNull('MembershipInviteRevokeInput'),
  },

  resolve: async (_, { input }, ctx) => {
    if (!ctx.organizationId || !ctx.userId) {
      throw new GraphQLError('Forbidden')
    }

    let membership

    try {
      membership = await ctx.membership.archiveMembership({
        membershipId: input.membershipId,
      })
    } catch (error) {
      throw new GraphQLError('Failed to archive membership')
    }

    return {
      membership: membershipFactoryToGraphql(membership),
    }
  },
})

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
        existingUser = await ctx.user.getUserByEmail({ email })
      } catch (error) {
        throw new GraphQLError('Failed to get user by email')
      }

      if (existingUser) {
        // Check if user has a membership in this organization
        const [membership] = await ctx.membership.listMemberships({
          where: {
            organizationId: ctx.organizationId,
            userId: existingUser.id,
            // Include deleted memberships
            deletedAt: undefined,
          },
        })

        if (membership) {
          // If membership is archived, unarchive
          if (membership.deletedAt) {
            try {
              await ctx.membership.unarchiveMembership({
                membershipId: membership.id,
              })
            } catch (error) {
              throw new GraphQLError('Failed to unarchive membership')
            }

            memberships.push(membership)
          } else {
            // If membership is already active, we don't want to notify the user, so don't add membership to list
          }

          continue
        }
      } else {
        // If there's not an existing user, lets check if there's an invited membership with this email
        const [membership] = await ctx.membership.listMemberships({
          where: {
            organizationId: ctx.organizationId,
            invitedEmail: email,
            // Include deleted memberships
            deletedAt: undefined,
          },
        })

        if (membership) {
          if (membership.deletedAt) {
            try {
              await ctx.membership.unarchiveMembership({
                membershipId: membership.id,
              })
            } catch (error) {
              throw new GraphQLError('Failed to unarchive membership')
            }
          }

          // If we are re-inviting an already invited user (that hasn't yet created a USER record), we can send them another email
          memberships.push(membership)

          continue
        }
      }

      let newMembership

      try {
        newMembership = await ctx.membership.createMembership({
          membership: {
            invitedEmail: email,
            invitedName: null,
            organizationId: ctx.organizationId,
            role: 'OWNER',
            // Do not assign user ID until user accepts invitation
            userId: null,
          },
        })

        memberships.push(newMembership)
      } catch (error) {
        throw new GraphQLError('Failed to create membership')
      }
    }

    for (const membership of memberships) {
      if (!membership.invitedEmail) {
        continue
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
            membership,
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

    return { memberships: memberships.map(membershipFactoryToGraphql) }
  },
})

export const MembershipConnectAnonymousResourcesPayload = objectType({
  name: 'MembershipConnectAnonymousResourcesPayload',
  definition(t) {
    t.nonNull.field('membership', { type: 'Membership' })
  },
})

export const membershipConnectAnonymousResources = mutationField(
  'membershipConnectAnonymousResources',
  {
    type: 'MembershipConnectAnonymousResourcesPayload',
    resolve: async (_, __, ctx) => {
      ctx.logger.debug('membershipConnectAnonymousResources')

      if (!ctx.membershipId) {
        throw new GraphQLError('Forbidden')
      }

      let membership

      try {
        membership = await ctx.membership.getMembership({
          membershipId: ctx.membershipId,
        })
      } catch (error) {
        throw new GraphQLError('Failed to get membership')
      }

      if (!ctx.deviceId) {
        ctx.logger.error('No device ID found to connect anonymous resources')
      } else {
        let anonomousUserResources

        ctx.logger.debug("DEVICE ID: '" + ctx.deviceId + "'")

        try {
          anonomousUserResources = await ctx.keyValueStore.getValue(
            KeyValueRecordKey.UNAUTHENTICATED_USER_STORE,
            ctx.deviceId,
          )
        } catch (error) {
          ctx.logger.error(error)
        }

        ctx.logger
          .child({
            anonomousUserResources,
          })
          .debug('anonomousUserResources')

        for (const designRequestId of anonomousUserResources?.designRequestIds ||
          []) {
          // Associate design requests with new membership and organization

          let foundDesignRequest

          try {
            foundDesignRequest = await ctx.design.getDesignRequest({
              designRequestId,
            })

            ctx.logger.child({ foundDesignRequest }).debug('foundDesignRequest')

            if (!foundDesignRequest) {
              continue
            }
          } catch (error) {
            ctx.logger.error(error)
            continue
          }

          try {
            await ctx.design.updateDesignRequest({
              designRequest: {
                ...foundDesignRequest,
                status: 'SUBMITTED',
                organizationId:
                  foundDesignRequest?.organizationId ||
                  membership.organizationId,
                membershipId: foundDesignRequest?.membershipId || membership.id,
              },
            })
          } catch (error) {
            ctx.logger.error(error)
          }
        }

        for (const orderId of anonomousUserResources?.orderIds || []) {
          // Associate orders with new membership and organization

          let foundOrder

          try {
            foundOrder = await ctx.order.getOrder({ orderId }, { actor: ctx })

            if (!foundOrder) {
              continue
            }
          } catch (error) {
            ctx.logger.error(error)
            continue
          }

          try {
            await ctx.order.updateOrder({
              actor: {
                gaClientId: ctx.gaClientId,
                membershipId: ctx.membershipId,
                organizationId: ctx.organizationId,
                userId: ctx.userId,
              },
              order: {
                ...foundOrder,
                organizationId:
                  foundOrder?.organizationId || membership.organizationId,
                membershipId: foundOrder?.membershipId || membership.id,
                userId: foundOrder?.userId || membership.userId,
              },
            })
          } catch (error) {
            ctx.logger.error(error)
          }
        }

        // Remove anonomous user resources from KV store

        try {
          await ctx.keyValueStore.setValue(
            KeyValueRecordKey.UNAUTHENTICATED_USER_STORE,
            ctx.deviceId,
            {
              designRequestIds: [],
              orderIds: [],
            },
          )
        } catch (error) {
          ctx.logger.error(error)
        }
      }

      return {
        membership: membershipFactoryToGraphql(membership),
      }
    },
  },
)
