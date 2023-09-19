import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
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
        where: {
          // By default, only return memberships that have not been deleted. If
          // the user wants to include deleted memberships, they can pass in
          // `{ deletedAt: undefined }` as a where clause.
          deletedAt: null,
          ...input.where,
        },
      })
    } catch (error) {
      logger
        .child({
          context: { error },
        })
        .error(`Failed to get membership s`)
      throw new Error('Failed to get membership s')
    }

    return membershipRecords.map(membership =>
      membershipFactory({
        membershipRecord: membership,
      }),
    )
  }

export { makeListMemberships }
