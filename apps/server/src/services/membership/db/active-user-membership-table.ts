import {
  PrismaClient,
  ActiveUserMembership as ActiveUserMembershipSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const ActiveUserMembership: yup.ObjectSchema<ActiveUserMembershipSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      userId: yup.string().required(),
      organizationId: yup.string().uuid().required(),
      membershipId: yup.string().uuid().required(),
    })
    .label('ActiveUserMembership')

export type ActiveUserMembershipRecord = yup.Asserts<
  typeof ActiveUserMembership
>

export const table = (db: PrismaClient) => db.activeUserMembership
export type ActiveUserMembershipTable = ReturnType<typeof table>
