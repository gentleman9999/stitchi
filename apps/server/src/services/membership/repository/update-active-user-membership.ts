import {
  ActiveUserMembership,
  ActiveUserMembershipTable,
} from '../db/active-user-membership-table'
import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  activeUserMembershipFactory,
  ActiveUserMembershipFactoryActiveUserMembership,
} from '../factory/active-user-membership'

const inputSchema = ActiveUserMembership.omit([])

const prisma = new PrismaClient()

interface UpdateActiveUserMembershipConfig {
  activeUserMembershipTable: ActiveUserMembershipTable
}

export interface UpdateActiveUserMembershipFnInput {
  activeUserMembership: yup.Asserts<typeof inputSchema>
}

type UpdateActiveUserMembershipFn = (
  input: UpdateActiveUserMembershipFnInput,
) => Promise<ActiveUserMembershipFactoryActiveUserMembership>

type MakeUpdateActiveUserMembershipFn = (
  config?: UpdateActiveUserMembershipConfig,
) => UpdateActiveUserMembershipFn

const makeUpdateActiveUserMembership: MakeUpdateActiveUserMembershipFn =
  (
    { activeUserMembershipTable } = {
      activeUserMembershipTable: prisma.activeUserMembership,
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.activeUserMembership)

    let existingActiveUserMembership

    try {
      existingActiveUserMembership = await activeUserMembershipTable.findUnique(
        {
          where: {
            id: validInput.id,
          },
        },
      )

      if (!existingActiveUserMembership) {
        throw new Error('ActiveUserMembership not found')
      }
    } catch (error) {
      console.error(error)
      throw new Error('Unable to find activeUserMembership')
    }

    let updatedActiveUserMembership

    try {
      updatedActiveUserMembership = await activeUserMembershipTable.update({
        where: {
          id: validInput.id,
        },
        data: {
          membershipId: validInput.membershipId,
          userId: validInput.userId,
          organizationId: validInput.organizationId,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Unable to update activeUserMembership')
    }

    return activeUserMembershipFactory({
      activeUserMembershipRecord: updatedActiveUserMembership,
    })
  }

export { makeUpdateActiveUserMembership }
