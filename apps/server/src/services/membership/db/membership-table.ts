import { PrismaClient, Membership as MembershipSchema } from '@prisma/client'
import * as yup from 'yup'

export enum MembershipRecordRole {
  OWNER = 'OWNER',
  STITCHI_DESIGNER = 'STITCHI_DESIGNER',
}

export const Membership: yup.ObjectSchema<MembershipSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    organizationId: yup.string().uuid().required(),
    userId: yup.string().nullable().defined(),
    role: yup
      .mixed<MembershipRecordRole>()
      .oneOf(Object.values(MembershipRecordRole))
      .required(),

    membershipNotificationSettingId: yup.string().uuid().required(),

    invitedName: yup.string().nullable().defined(),
    invitedEmail: yup.string().email().nullable().defined(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('Membership')

export type MembershipRecord = yup.Asserts<typeof Membership>

export const table = (db: PrismaClient) => db.membership
export type MembershipTable = ReturnType<typeof table>
