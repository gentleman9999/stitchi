import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { ActiveUserMembershipTable } from '../db/active-user-membership-table'
import {
  ActiveUserMembershipFactoryActiveUserMembership,
  activeUserMembershipFactory,
} from '../factory/active-user-membership'

const prisma = new PrismaClient()

interface ListActiveUserMembershipsConfig {
  activeUserMembershipTable: ActiveUserMembershipTable
}

export interface ListActiveUserMembershipsFnInput
  extends Omit<Prisma.ActiveUserMembershipFindManyArgs, 'include' | 'select'> {}

type ListActiveUserMembershipsFn = (
  input: ListActiveUserMembershipsFnInput,
) => Promise<ActiveUserMembershipFactoryActiveUserMembership[]>

type MakeListActiveUserMembershipsFn = (
  config?: ListActiveUserMembershipsConfig,
) => ListActiveUserMembershipsFn

const makeListActiveUserMemberships: MakeListActiveUserMembershipsFn =
  (
    { activeUserMembershipTable } = {
      activeUserMembershipTable: prisma.activeUserMembership,
    },
  ) =>
  async input => {
    let activeUserMembershipRecords

    try {
      activeUserMembershipRecords = await activeUserMembershipTable.findMany({
        ...input,
      })
    } catch (error) {
      logger
        .child({
          context: { error },
        })
        .error(`Failed to get activeUserMemberships`)
      throw new Error('Failed to get activeUserMemberships')
    }

    return activeUserMembershipRecords.map(activeUserMembership =>
      activeUserMembershipFactory({
        activeUserMembershipRecord: activeUserMembership,
      }),
    )
  }

export { makeListActiveUserMemberships }
