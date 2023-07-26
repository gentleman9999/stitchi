import { MembershipFactoryMembership } from './factory/membership'
import makeMembershipRepository, { MembershipRepository } from './repository'
import { CreateMembershipFnInput } from './repository/create-membership'

export interface MembershipService {
  createMembership: (
    input: Omit<CreateMembershipFnInput, 'membershipNotificationSettingId'>,
  ) => Promise<MembershipFactoryMembership>
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

  getMembershipNotificationSetting: MembershipRepository['getMembershipNotificationSetting']
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
        console.error(
          `Error creating membership notification setting for organization: ${input.membership.organizationId}`,
          {
            context: {
              error,
              input,
            },
          },
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
        console.error(
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
        console.error(`Error getting membership: ${input.membershipId}`, {
          context: {
            error,
            input,
          },
        })
        throw error
      }

      return membership
    },

    listMemberships: async input => {
      let memberships

      try {
        memberships = await membershipRepository.listMemberships(input)
      } catch (error) {
        console.error(`Error listing memberships`, {
          context: {
            error,
            input,
          },
        })
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
        console.error(`Error listing active user memberships`, {
          context: {
            error,
            input,
          },
        })
        throw error
      }

      if (!activeUserMembership) return null

      let membership

      try {
        membership = await membershipRepository.getMembership({
          membershipId: activeUserMembership.membershipId,
        })
      } catch (error) {
        console.error(`Error getting active user membership`, {
          context: {
            error,
            input,
          },
        })
        throw error
      }

      return membership
    },

    setUserActiveMembership: async input => {
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
        console.error(`Error listing active user memberships`, {
          context: {
            error,
            input,
          },
        })
        throw error
      }

      if (activeUserMembership) {
        try {
          activeUserMembership =
            await membershipRepository.updateActiveUserMembership({
              activeUserMembership: {
                id: activeUserMembership.id,
                userId: activeUserMembership.userId,
                membershipId: input.membershipId,
                organizationId: input.organizationId,
              },
            })
        } catch (error) {
          console.error(`Error updating active user membership`, {
            context: {
              error,
              input,
            },
          })
          throw error
        }
      } else {
        try {
          activeUserMembership =
            await membershipRepository.createActiveUserMembership({
              activeUserMembership: {
                userId: input.userId,
                membershipId: input.membershipId,
                organizationId: input.organizationId,
              },
            })
        } catch (error) {
          console.error(`Error creating active user membership`, {
            context: {
              error,
              input,
            },
          })
          throw error
        }
      }

      let membership

      try {
        membership = await membershipRepository.getMembership({
          membershipId: activeUserMembership.membershipId,
        })
      } catch (error) {
        console.error(`Error getting active user membership`, {
          context: {
            error,
            input,
          },
        })
        throw error
      }

      return membership
    },

    getMembershipNotificationSetting: async input => {
      let membershipNotificationSetting

      try {
        membershipNotificationSetting =
          await membershipRepository.getMembershipNotificationSetting(input)
      } catch (error) {
        console.error(
          `Error getting membership notification setting: ${input.membershipNotificationSettingId}`,
          {
            context: {
              error,
              input,
            },
          },
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
        console.error(
          `Error updating membership notification setting: ${input.membershipNotificationSetting.id}`,
          {
            context: {
              error,
              input,
            },
          },
        )
        throw error
      }

      return membershipNotificationSetting
    },
  }
}

export { makeClient }
