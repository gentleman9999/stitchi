import { Prisma, PrismaClient } from '@prisma/client'
import { OrganizationTable } from '../db/organization-table'
import {
  OrganizationFactoryOrganization,
  organizationFactory,
} from '../factory/organization'

const prisma = new PrismaClient()

interface ListOrganizationsConfig {
  organizationTable: OrganizationTable
}

export interface ListOrganizationsFnInput
  extends Omit<Prisma.OrganizationFindManyArgs, 'include' | 'select'> {}

type ListOrganizationsFn = (
  input: ListOrganizationsFnInput,
) => Promise<OrganizationFactoryOrganization[]>

type MakeListOrganizationsFn = (
  config?: ListOrganizationsConfig,
) => ListOrganizationsFn

const makeListOrganizations: MakeListOrganizationsFn =
  (
    { organizationTable } = {
      organizationTable: prisma.organization,
    },
  ) =>
  async input => {
    let organizationRecords

    try {
      organizationRecords = await organizationTable.findMany({
        ...input,
      })
    } catch (error) {
      console.error(`Failed to get organization s`, {
        context: { error },
      })
      throw new Error('Failed to get organization s')
    }

    return organizationRecords.map(organization =>
      organizationFactory({
        organizationRecord: organization,
      }),
    )
  }

export { makeListOrganizations }
