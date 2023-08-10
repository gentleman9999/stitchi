import { PrismaClient } from '@prisma/client'
import { OrganizationColorTable } from '../db/organization-color-table'
import {
  OrganizationFactoryOrganizationColor,
  organizationColorFactory,
} from '../factory/organization-color'

const primsa = new PrismaClient()

interface GetOrganizationColorConfig {
  organizationColorTable: OrganizationColorTable
}

export interface GetOrganizationColorFnInput {
  organizationColorId: string
}

type GetOrganizationColorFn = (
  input: GetOrganizationColorFnInput,
) => Promise<OrganizationFactoryOrganizationColor>

type MakeGetOrganizationColorFn = (
  config?: GetOrganizationColorConfig,
) => GetOrganizationColorFn

const makeGetOrganizationColor: MakeGetOrganizationColorFn =
  (
    { organizationColorTable } = {
      organizationColorTable: primsa.organizationColor,
    },
  ) =>
  async input => {
    const organizationColor = await organizationColorTable.findFirst({
      where: {
        id: input.organizationColorId,
        deletedAt: null,
      },
    })

    if (!organizationColor) {
      throw new Error(`OrganizationColor proof not found: ${input}`)
    }

    return organizationColorFactory({
      organizationColorRecord: organizationColor,
    })
  }

export { makeGetOrganizationColor }
