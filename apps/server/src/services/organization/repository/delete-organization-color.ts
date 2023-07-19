import { PrismaClient } from '@prisma/client'
import { OrganizationColorTable } from '../db/organization-color-table'
import {
  OrganizationFactoryOrganizationColor,
  organizationColorFactory,
} from '../factory/organization-color'

const primsa = new PrismaClient()

interface DeleteOrganizationColorConfig {
  organizationColorTable: OrganizationColorTable
}

export interface DeleteOrganizationColorFnInput {
  organizationColorId: string
}

type DeleteOrganizationColorFn = (
  input: DeleteOrganizationColorFnInput,
) => Promise<OrganizationFactoryOrganizationColor>

type MakeDeleteOrganizationColorFn = (
  config?: DeleteOrganizationColorConfig,
) => DeleteOrganizationColorFn

const makeDeleteOrganizationColor: MakeDeleteOrganizationColorFn =
  (
    { organizationColorTable } = {
      organizationColorTable: primsa.organizationColor,
    },
  ) =>
  async input => {
    let organizationColor

    try {
      organizationColor = await organizationColorTable.update({
        where: {
          id: input.organizationColorId,
        },
        data: {
          deletedAt: new Date(),
        },
      })
    } catch (error) {
      console.error('Unable to delete color', {
        context: { error, input },
      })

      throw new Error('Unable to delete color')
    }

    return organizationColorFactory({
      organizationColorRecord: organizationColor,
    })
  }

export { makeDeleteOrganizationColor }
