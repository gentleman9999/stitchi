import {
  MembershipNotificationSetting,
  MembershipNotificationSettingTable,
  table as makeMembershipNotificationSettingTable,
} from '../db/membership-notification-setting-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  membershipNotificationSettingFactory,
  MembershipFactoryMembershipNotificationSetting,
} from '../factory/membership-notification-setting'

const inputSchema = MembershipNotificationSetting.omit(['id'])

const prisma = new PrismaClient()

interface CreateMembershipNotificationSettingConfig {
  membershipNotificationSettingTable: MembershipNotificationSettingTable
}

export interface CreateMembershipNotificationSettingFnInput {
  membershipNotificationSetting: yup.InferType<typeof inputSchema>
}

type CreateMembershipNotificationSettingFn = (
  input: CreateMembershipNotificationSettingFnInput,
) => Promise<MembershipFactoryMembershipNotificationSetting>

type MakeCreateMembershipNotificationSettingFn = (
  config?: CreateMembershipNotificationSettingConfig,
) => CreateMembershipNotificationSettingFn

const makeCreateMembershipNotificationSetting: MakeCreateMembershipNotificationSettingFn =

    (
      { membershipNotificationSettingTable } = {
        membershipNotificationSettingTable:
          makeMembershipNotificationSettingTable(prisma),
      },
    ) =>
    async input => {
      const validInput = await inputSchema.validate(
        input.membershipNotificationSetting,
      )

      let membershipNotificationSetting

      try {
        membershipNotificationSetting =
          await membershipNotificationSettingTable.create({
            data: {
              emailNotificationsEnabled: validInput.emailNotificationsEnabled,
              smsNotificationsEnabled: validInput.smsNotificationsEnabled,
              webNotificationsEnabled: validInput.webNotificationsEnabled,
            },
          })
      } catch (error) {
        console.error(error)
        throw new Error('Failed to create membershipNotificationSetting')
      }

      return membershipNotificationSettingFactory({
        membershipNotificationSettingRecord: membershipNotificationSetting,
      })
    }

export { makeCreateMembershipNotificationSetting }
