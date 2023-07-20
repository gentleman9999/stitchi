import {
  ActiveUserMembership,
  ActiveUserMembershipTable,
  table as makeActiveUserMembershipTable,
} from '../db/active-user-membership-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  activeUserMembershipFactory,
  ActiveUserMembershipFactoryActiveUserMembership,
} from '../factory/active-user-membership'

const inputSchema = ActiveUserMembership.omit(['id'])

const prisma = new PrismaClient()

interface CreateActiveUserMembershipConfig {
  activeUserMembershipTable: ActiveUserMembershipTable
}

export interface CreateActiveUserMembershipFnInput {
  activeUserMembership: yup.InferType<typeof inputSchema>
}

type CreateActiveUserMembershipFn = (
  input: CreateActiveUserMembershipFnInput,
) => Promise<ActiveUserMembershipFactoryActiveUserMembership>

type MakeCreateActiveUserMembershipFn = (
  config?: CreateActiveUserMembershipConfig,
) => CreateActiveUserMembershipFn

const makeCreateActiveUserMembership: MakeCreateActiveUserMembershipFn =
  (
    { activeUserMembershipTable } = {
      activeUserMembershipTable: makeActiveUserMembershipTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.activeUserMembership)

    let activeUserMembership

    try {
      activeUserMembership = await activeUserMembershipTable.create({
        data: {
          organizationId: validInput.organizationId,
          userId: validInput.userId,
          membershipId: validInput.membershipId,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create activeUserMembership')
    }

    return activeUserMembershipFactory({
      activeUserMembershipRecord: activeUserMembership,
    })
  }

export { makeCreateActiveUserMembership }
