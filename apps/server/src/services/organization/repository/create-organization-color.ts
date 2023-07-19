import {
  OrganizationColor,
  OrganizationColorTable,
  table as makeOrganizationColorTable,
} from '../db/organization-color-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  organizationColorFactory,
  OrganizationFactoryOrganizationColor,
} from '../factory/organization-color'

const inputSchema = OrganizationColor.omit([
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
])

const prisma = new PrismaClient()

interface CreateOrganizationColorConfig {
  organizationColorTable: OrganizationColorTable
}

export interface CreateOrganizationColorFnInput {
  organizationColor: yup.InferType<typeof inputSchema>
}

type CreateOrganizationColorFn = (
  input: CreateOrganizationColorFnInput,
) => Promise<OrganizationFactoryOrganizationColor>

type MakeCreateOrganizationColorFn = (
  config?: CreateOrganizationColorConfig,
) => CreateOrganizationColorFn

const makeCreateOrganizationColor: MakeCreateOrganizationColorFn =
  (
    { organizationColorTable } = {
      organizationColorTable: makeOrganizationColorTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.organizationColor)

    let organizationColor

    try {
      organizationColor = await organizationColorTable.create({
        data: {
          organizationId: validInput.organizationId,
          hex: validInput.hex,
          name: validInput.name,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create organizationColor')
    }

    return organizationColorFactory({
      organizationColorRecord: organizationColor,
    })
  }

export { makeCreateOrganizationColor }
