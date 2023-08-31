import { PrismaClient } from '@prisma/client'
import {
  table as makeActiveUserMembershipTable,
  ActiveUserMembership,
  ActiveUserMembershipTable,
} from '../db/active-user-membership-table'
import * as yup from 'yup'
import {
  activeUserMembershipFactory,
  ActiveUserMembershipFactoryActiveUserMembership,
} from '../factory/active-user-membership'
import { logger } from '../../../telemetry'

const inputSchema = ActiveUserMembership.omit(['id'])

const prisma = new PrismaClient()

interface UpsertActiveUserMembershipConfig {
  activeUserMembershipTable: ActiveUserMembershipTable
}

export interface UpsertActiveUserMembershipFnInput {
  activeUserMembership: yup.InferType<typeof inputSchema>
}

type UpsertActiveUserMembershipFn = (
  input: UpsertActiveUserMembershipFnInput,
) => Promise<ActiveUserMembershipFactoryActiveUserMembership>

type MakeUpserActiveUserMembershipFn = (
  config?: UpsertActiveUserMembershipConfig,
) => UpsertActiveUserMembershipFn

export const makeUpsertActiveUserMembership: MakeUpserActiveUserMembershipFn =
  (
    { activeUserMembershipTable } = {
      activeUserMembershipTable: makeActiveUserMembershipTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.activeUserMembership)

    let activeUserMembership

    try {
      activeUserMembership = await activeUserMembershipTable.upsert({
        where: {
          userId: validInput.userId,
        },
        create: {
          userId: validInput.userId,
          membershipId: validInput.membershipId,
          organizationId: validInput.organizationId,
        },
        update: {
          membershipId: validInput.membershipId,
          organizationId: validInput.organizationId,
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
