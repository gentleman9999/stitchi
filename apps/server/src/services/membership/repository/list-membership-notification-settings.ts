import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { MembershipNotificationSettingTable } from '../db/membership-notification-setting-table'
import {
  MembershipFactoryMembershipNotificationSetting,
  membershipNotificationSettingFactory,
} from '../factory/membership-notification-setting'

const prisma = new PrismaClient()

interface ListMembershipNotificationSettingsConfig {
  membershipNotificationSettingTable: MembershipNotificationSettingTable
}

export interface ListMembershipNotificationSettingsFnInput
  extends Omit<
    Prisma.MembershipNotificationSettingFindManyArgs,
    'include' | 'select'
  > {}

type ListMembershipNotificationSettingsFn = (
  input: ListMembershipNotificationSettingsFnInput,
) => Promise<MembershipFactoryMembershipNotificationSetting[]>

type MakeListMembershipNotificationSettingsFn = (
  config?: ListMembershipNotificationSettingsConfig,
) => ListMembershipNotificationSettingsFn

const makeListMembershipNotificationSettings: MakeListMembershipNotificationSettingsFn =

    (
      { membershipNotificationSettingTable } = {
        membershipNotificationSettingTable:
          prisma.membershipNotificationSetting,
      },
    ) =>
    async input => {
      let membershipNotificationSettingRecords

      try {
        membershipNotificationSettingRecords =
          await membershipNotificationSettingTable.findMany({
            ...input,
          })
      } catch (error) {
        logger
          .child({
            context: { error },
          })
          .error(`Failed to get membership s`)
        throw new Error('Failed to get membership s')
      }

      return membershipNotificationSettingRecords.map(setting =>
        membershipNotificationSettingFactory({
          membershipNotificationSettingRecord: setting,
        }),
      )
    }

export { makeListMembershipNotificationSettings }
