import {
  MembershipNotificationSetting,
  MembershipNotificationSettingTable,
} from '../db/membership-notification-setting-table'
import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  membershipNotificationSettingFactory,
  MembershipFactoryMembershipNotificationSetting,
} from '../factory/membership-notification-setting'

const inputSchema = MembershipNotificationSetting.omit([])

const prisma = new PrismaClient()

interface UpdateMembershipNotificationSettingConfig {
  membershipNotificationSettingTable: MembershipNotificationSettingTable
}

export interface UpdateMembershipNotificationSettingFnInput {
  membershipNotificationSetting: yup.Asserts<typeof inputSchema>
}

type UpdateMembershipNotificationSettingFn = (
  input: UpdateMembershipNotificationSettingFnInput,
) => Promise<MembershipFactoryMembershipNotificationSetting>

type MakeUpdateMembershipNotificationSettingFn = (
  config?: UpdateMembershipNotificationSettingConfig,
) => UpdateMembershipNotificationSettingFn

const makeUpdateMembershipNotificationSetting: MakeUpdateMembershipNotificationSettingFn =

    (
      { membershipNotificationSettingTable } = {
        membershipNotificationSettingTable:
          prisma.membershipNotificationSetting,
      },
    ) =>
    async input => {
      const validInput = await inputSchema.validate(
        input.membershipNotificationSetting,
      )

      let existingMembershipNotificationSetting

      try {
        existingMembershipNotificationSetting =
          await membershipNotificationSettingTable.findUnique({
            where: {
              id: validInput.id,
            },
          })

        if (!existingMembershipNotificationSetting) {
          throw new Error('MembershipNotificationSetting not found')
        }
      } catch (error) {
        console.error(error)
        throw new Error('Unable to find membershipNotificationSetting')
      }

      let updatedMembershipNotificationSetting

      try {
        updatedMembershipNotificationSetting =
          await membershipNotificationSettingTable.update({
            where: {
              id: validInput.id,
            },
            data: {
              emailNotificationsEnabled: validInput.emailNotificationsEnabled,
              smsNotificationsEnabled: validInput.smsNotificationsEnabled,
              webNotificationsEnabled: validInput.webNotificationsEnabled,
            },
          })
      } catch (error) {
        console.error(error)
        throw new Error('Unable to update membershipNotificationSetting')
      }

      return membershipNotificationSettingFactory({
        membershipNotificationSettingRecord:
          updatedMembershipNotificationSetting,
      })
    }

export { makeUpdateMembershipNotificationSetting }
