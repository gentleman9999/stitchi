import {
  PrismaClient,
  MembershipNotificationSetting as MembershipNotificationSettingSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const MembershipNotificationSetting: yup.ObjectSchema<MembershipNotificationSettingSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),

      smsNotificationsEnabled: yup.boolean().required(),
      emailNotificationsEnabled: yup.boolean().required(),
      webNotificationsEnabled: yup.boolean().required(),
    })
    .label('MembershipNotificationSetting')

export type MembershipNotificationSettingRecord = yup.Asserts<
  typeof MembershipNotificationSetting
>

export const table = (db: PrismaClient) => db.membershipNotificationSetting
export type MembershipNotificationSettingTable = ReturnType<typeof table>
