import {
  Membership,
  MembershipTable,
  table as makeMembershipTable,
} from '../db/membership-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  membershipFactory,
  MembershipFactoryMembership,
} from '../factory/membership'
import { logger } from '../../../telemetry'

const inputSchema = Membership.omit([
  'organizationId',
  'membershipNotificationSettingId',
  'createdAt',
  'updatedAt',
  'deletedAt',
]).concat(
  yup
    .object()
    .shape({
      deletedAt: yup.date().nullable().optional(),
    })
    .required(),
)

const prisma = new PrismaClient()

interface UpdateMembershipConfig {
  membershipTable: MembershipTable
}

export interface UpdateMembershipFnInput {
  membership: yup.InferType<typeof inputSchema>
}

type UpdateMembershipFn = (
  input: UpdateMembershipFnInput,
) => Promise<MembershipFactoryMembership>

type MakeUpdateMembershipFn = (
  config?: UpdateMembershipConfig,
) => UpdateMembershipFn

const makeUpdateMembership: MakeUpdateMembershipFn =
  (
    { membershipTable } = {
      membershipTable: makeMembershipTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.membership)

    let membership

    try {
      membership = await membershipTable.update({
        where: {
          id: validInput.id,
        },
        data: {
          userId: validInput.userId,
          role: validInput.role,
          invitedEmail: validInput.invitedEmail,
          invitedName: validInput.invitedName,
          deletedAt: validInput.deletedAt,
        },
      })
    } catch (error) {
      logger.error(`Failed to update membership`, { context: { error, input } })
      throw new Error('Failed to update membership')
    }

    return membershipFactory({
      membershipRecord: membership,
    })
  }

export { makeUpdateMembership }
