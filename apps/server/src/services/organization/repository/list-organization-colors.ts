import { Prisma, PrismaClient } from '@prisma/client'
import { OrganizationColorTable } from '../db/organization-color-table'
import {
  OrganizationFactoryOrganizationColor,
  organizationColorFactory,
} from '../factory/organization-color'

const prisma = new PrismaClient()

interface ListOrganizationColorsConfig {
  organizationColorTable: OrganizationColorTable
}

export interface ListOrganizationColorsFnInput
  extends Omit<Prisma.OrganizationColorFindManyArgs, 'include' | 'select'> {}

type ListOrganizationColorsFn = (
  input: ListOrganizationColorsFnInput,
) => Promise<OrganizationFactoryOrganizationColor[]>

type MakeListOrganizationColorsFn = (
  config?: ListOrganizationColorsConfig,
) => ListOrganizationColorsFn

const makeListOrganizationColors: MakeListOrganizationColorsFn =
  (
    { organizationColorTable } = {
      organizationColorTable: prisma.organizationColor,
    },
  ) =>
  async input => {
    let organizationColorRecords

    try {
      organizationColorRecords = await organizationColorTable.findMany({
        ...input,
      })
    } catch (error) {
      console.error(`Failed to get organization colors`, {
        context: { error },
      })
      throw new Error('Failed to get organization colors')
    }

    return organizationColorRecords.map(color =>
      organizationColorFactory({
        organizationColorRecord: color,
      }),
    )
  }

export { makeListOrganizationColors }
