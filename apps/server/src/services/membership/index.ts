import { logger } from '../../telemetry'
import { MembershipFactoryMembership } from './factory/membership'
import { MembershipFactoryMembershipNotificationSetting } from './factory/membership-notification-setting'
import makeMembershipRepository, { MembershipRepository } from './repository'
import { CreateMembershipFnInput } from './repository/create-membership'

export interface MembershipService {
  createMembership: (input: {
    membership: Omit<
      CreateMembershipFnInput['membership'],
      'membershipNotificationSettingId'
    >
  }) => Promise<MembershipFactoryMembership>
  getMembership: MembershipRepository['getMembership']
  listMemberships: MembershipRepository['listMemberships']

  findUserActiveMembership: (input: {
    userId: string
  }) => Promise<MembershipFactoryMembership | null>

  setUserActiveMembership: (input: {
    userId: string
    membershipId: string
    organizationId: string
  }) => Promise<MembershipFactoryMembership>

  getMembershipNotificationSetting: (
    membershipId: string,
  ) => Promise<MembershipFactoryMembershipNotificationSetting>
  updateMembershipNotificationSetting: MembershipRepository['updateMembershipNotificationSetting']
}

interface MakeClientParams {
  membershipRepository: MembershipRepository
}

type MakeClientFn = (params?: MakeClientParams) => MembershipService

const makeClient: MakeClientFn = (
  { membershipRepository } = {
    membershipRepository: makeMembershipRepository(),
  },
) => {
  return {
    createMembership: async input => {
      let membershipNotificationSetting

      try {
        membershipNotificationSetting =
          await membershipRepository.createMembershipNotificationSetting({
            membershipNotificationSetting: {
              emailNotificationsEnabled: true,
              smsNotificationsEnabled: true,
              webNotificationsEnabled: true,
            },
          })
      } catch (error) {
        logger
          .child({
            context: {
              error,
              input,
            },
          })
          .error(
            `Error creating membership notification setting for organization: ${input.membership.organizationId}`,
          )
        throw new Error('Failed to create memberhsip notification setting')
      }

      let membership

      try {
        membership = await membershipRepository.createMembership({
          membership: {
            ...input.membership,
            membershipNotificationSettingId: membershipNotificationSetting.id,
          },
        })
      } catch (error) {
        logger.error(
          `Error creating membership for organization: ${input.membership.organizationId}`,
          {
            context: {
              error,
              input,
            },
          },
        )
        throw new Error('Failed to create membership')
      }

      return membership
    },
    getMembership: async input => {
      let membership

      try {
        membership = await membershipRepository.getMembership(input)
      } catch (error) {
        logger
          .child({
            context: {
              error,
              input,
            },
          })
          .error(`Error getting membership: ${input.membershipId}`)
        throw error
      }

      return membership
    },

    listMemberships: async input => {
      let memberships

      try {
        memberships = await membershipRepository.listMemberships(input)
      } catch (error) {
        logger
          .child({
            context: {
              error,
              input,
            },
          })
          .error(`Error listing memberships`)
        throw error
      }

      return memberships
    },

    findUserActiveMembership: async input => {
      let activeUserMembership

      try {
        const [membership] =
          await membershipRepository.listActiveUserMemberships({
            where: {
              userId: input.userId,
            },
            take: 1,
          })

        activeUserMembership = membership
      } catch (error) {
        logger
          .child({
            context: {
              error,
              input,
            },
          })
          .error(`Error listing active user memberships`)
        throw error
      }

      if (!activeUserMembership) return null

      let membership

      try {
        membership = await membershipRepository.getMembership({
          membershipId: activeUserMembership.membershipId,
        })
      } catch (error) {
        logger
          .child({
            context: {
              error,
              input,
            },
          })
          .error(`Error getting active user membership`)
        throw error
      }

      return membership
    },

    setUserActiveMembership: async input => {
      let activeUserMembership

      try {
        activeUserMembership =
          await membershipRepository.upsertActiveUserMembership({
            activeUserMembership: input,
          })
      } catch (error) {
        logger
          .child({
            context: {
              error,
              input,
            },
          })
          .error(`Error upserting active user membership`)
        throw error
      }

      let membership

      try {
        membership = await membershipRepository.getMembership({
          membershipId: activeUserMembership.membershipId,
        })
      } catch (error) {
        logger
          .child({
            context: {
              error,
              input,
            },
          })
          .error(`Error getting active user membership`)
        throw error
      }

      return membership
    },

    getMembershipNotificationSetting: async membershipId => {
      let membershipNotificationSetting

      try {
        membershipNotificationSetting = (
          await membershipRepository.listMembershipNotificationSettings({
            take: 1,
            where: {
              membership: {
                id: membershipId,
              },
            },
          })
        )[0]

        if (!membershipNotificationSetting) {
          throw new Error(
            `Membership notification setting not found for member: ${membershipId}`,
          )
        }
      } catch (error) {
        logger
          .child({
            context: {
              error,
              membershipId,
            },
          })
          .error(
            `Error getting membership notification setting for member: ${membershipId}`,
          )
        throw error
      }

      return membershipNotificationSetting
    },

    updateMembershipNotificationSetting: async input => {
      let membershipNotificationSetting

      try {
        membershipNotificationSetting =
          await membershipRepository.updateMembershipNotificationSetting(input)
      } catch (error) {
        logger
          .child({
            context: {
              error,
              input,
            },
          })
          .error(
            `Error updating membership notification setting: ${input.membershipNotificationSetting.id}`,
          )
        throw error
      }

      return membershipNotificationSetting
    },
  }
}

export { makeClient }
