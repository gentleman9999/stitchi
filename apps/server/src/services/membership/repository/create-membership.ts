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

const inputSchema = Membership.omit(['id', 'createdAt', 'updatedAt'])

const prisma = new PrismaClient()

interface CreateMembershipConfig {
  membershipTable: MembershipTable
}

export interface CreateMembershipFnInput {
  membership: yup.InferType<typeof inputSchema>
}

type CreateMembershipFn = (
  input: CreateMembershipFnInput,
) => Promise<MembershipFactoryMembership>

type MakeCreateMembershipFn = (
  config?: CreateMembershipConfig,
) => CreateMembershipFn

const makeCreateMembership: MakeCreateMembershipFn =
  (
    { membershipTable } = {
      membershipTable: makeMembershipTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.membership)

    let membership

    try {
      membership = await membershipTable.create({
        data: {
          organizationId: validInput.organizationId,
          userId: validInput.userId,
          role: validInput.role,
          invitedEmail: validInput.invitedEmail,
          invitedName: validInput.invitedName,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create membership')
    }

    return membershipFactory({
      membershipRecord: membership,
    })
  }

export { makeCreateMembership }
