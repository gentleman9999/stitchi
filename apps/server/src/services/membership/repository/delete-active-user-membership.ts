import { PrismaClient } from '@prisma/client'
import {
  table as makeActiveUserMembershipTable,
  ActiveUserMembershipTable,
} from '../db/active-user-membership-table'
import {
  activeUserMembershipFactory,
  ActiveUserMembershipFactoryActiveUserMembership,
} from '../factory/active-user-membership'
import { logger } from '../../../telemetry'

const prisma = new PrismaClient()

interface DeleteActiveUserMembershipConfig {
  activeUserMembershipTable: ActiveUserMembershipTable
}

export interface DeleteActiveUserMembershipFnInput {
  activeUserMembership: {
    userId: string
  }
}

type DeleteActiveUserMembershipFn = (
  input: DeleteActiveUserMembershipFnInput,
) => Promise<ActiveUserMembershipFactoryActiveUserMembership>

type MakeUpserActiveUserMembershipFn = (
  config?: DeleteActiveUserMembershipConfig,
) => DeleteActiveUserMembershipFn

export const makeDeleteActiveUserMembership: MakeUpserActiveUserMembershipFn =
  (
    { activeUserMembershipTable } = {
      activeUserMembershipTable: makeActiveUserMembershipTable(prisma),
    },
  ) =>
  async input => {
    let activeUserMembership

    try {
      activeUserMembership = await activeUserMembershipTable.delete({
        where: {
          userId: input.activeUserMembership.userId,
        },
      })
    } catch (error) {
      logger.error(`Failed to upsert user membership`, {
        context: { error, input },
      })

      throw error
    }

    return activeUserMembershipFactory({
      activeUserMembershipRecord: activeUserMembership,
    })
  }
