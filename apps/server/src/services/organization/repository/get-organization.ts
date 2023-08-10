import { PrismaClient } from '@prisma/client'
import { OrganizationTable } from '../db/organization-table'
import {
  OrganizationFactoryOrganization,
  organizationFactory,
} from '../factory/organization'

const primsa = new PrismaClient()

interface GetOrganizationConfig {
  organizationTable: OrganizationTable
}

export interface GetOrganizationFnInput {
  organizationId: string
}

type GetOrganizationFn = (
  input: GetOrganizationFnInput,
) => Promise<OrganizationFactoryOrganization>

type MakeGetOrganizationFn = (
  config?: GetOrganizationConfig,
) => GetOrganizationFn

const makeGetOrganization: MakeGetOrganizationFn =
  ({ organizationTable } = { organizationTable: primsa.organization }) =>
  async input => {
    const organization = await organizationTable.findFirst({
      where: {
        id: input.organizationId,
        deletedAt: null,
      },
    })

    if (!organization) {
      throw new Error(`Organization proof not found: ${input}`)
    }

    return organizationFactory({ organizationRecord: organization })
  }

export { makeGetOrganization }
