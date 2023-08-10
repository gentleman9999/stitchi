import { Prisma, PrismaClient } from '@prisma/client'
import { MembershipTable } from '../db/membership-table'
import {
  MembershipFactoryMembership,
  membershipFactory,
} from '../factory/membership'

const prisma = new PrismaClient()

interface ListMembershipsConfig {
  membershipTable: MembershipTable
}

export interface ListMembershipsFnInput
  extends Omit<Prisma.MembershipFindManyArgs, 'include' | 'select'> {}

type ListMembershipsFn = (
  input: ListMembershipsFnInput,
) => Promise<MembershipFactoryMembership[]>

type MakeListMembershipsFn = (
  config?: ListMembershipsConfig,
) => ListMembershipsFn

const makeListMemberships: MakeListMembershipsFn =
  (
    { membershipTable } = {
      membershipTable: prisma.membership,
    },
  ) =>
  async input => {
    let membershipRecords

    try {
      membershipRecords = await membershipTable.findMany({
        ...input,
      })
    } catch (error) {
      console.error(`Failed to get membership s`, {
        context: { error },
      })
      throw new Error('Failed to get membership s')
    }

    return membershipRecords.map(membership =>
      membershipFactory({
        membershipRecord: membership,
      }),
    )
  }

export { makeListMemberships }
