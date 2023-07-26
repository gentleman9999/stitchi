import { PrismaClient } from '@prisma/client'
import { MembershipNotificationSettingTable } from '../db/membership-notification-setting-table'
import {
  MembershipFactoryMembershipNotificationSetting,
  membershipNotificationSettingFactory,
} from '../factory/membership-notification-setting'

const primsa = new PrismaClient()

interface GetMembershipNotificationSettingConfig {
  membershipNotificationSettingTable: MembershipNotificationSettingTable
}

export interface GetMembershipNotificationSettingFnInput {
  membershipNotificationSettingId: string
}

type GetMembershipNotificationSettingFn = (
  input: GetMembershipNotificationSettingFnInput,
) => Promise<MembershipFactoryMembershipNotificationSetting>

type MakeGetMembershipNotificationSettingFn = (
  config?: GetMembershipNotificationSettingConfig,
) => GetMembershipNotificationSettingFn

const makeGetMembershipNotificationSetting: MakeGetMembershipNotificationSettingFn =

    (
      { membershipNotificationSettingTable } = {
        membershipNotificationSettingTable:
          primsa.membershipNotificationSetting,
      },
    ) =>
    async input => {
      const membershipNotificationSetting =
        await membershipNotificationSettingTable.findFirst({
          where: {
            id: input.membershipNotificationSettingId,
          },
        })

      if (!membershipNotificationSetting) {
        throw new Error(
          `MembershipNotificationSetting proof not found: ${input}`,
        )
      }

      return membershipNotificationSettingFactory({
        membershipNotificationSettingRecord: membershipNotificationSetting,
      })
    }

export { makeGetMembershipNotificationSetting }
