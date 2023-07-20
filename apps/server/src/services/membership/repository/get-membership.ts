import { PrismaClient } from '@prisma/client'
import { MembershipTable } from '../db/membership-table'
import {
  MembershipFactoryMembership,
  membershipFactory,
} from '../factory/membership'

const primsa = new PrismaClient()

interface GetMembershipConfig {
  membershipTable: MembershipTable
}

export interface GetMembershipFnInput {
  membershipId: string
}

type GetMembershipFn = (
  input: GetMembershipFnInput,
) => Promise<MembershipFactoryMembership>

type MakeGetMembershipFn = (config?: GetMembershipConfig) => GetMembershipFn

const makeGetMembership: MakeGetMembershipFn =
  ({ membershipTable } = { membershipTable: primsa.membership }) =>
  async input => {
    const membership = await membershipTable.findFirst({
      where: {
        id: input.membershipId,
      },
    })

    if (!membership) {
      throw new Error(`Membership proof not found: ${input}`)
    }

    return membershipFactory({ membershipRecord: membership })
  }

export { makeGetMembership }
