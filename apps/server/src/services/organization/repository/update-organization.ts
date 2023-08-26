import {
  Organization,
  OrganizationTable,
  table as makeOrganizationTable,
} from '../db/organization-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  organizationFactory,
  OrganizationFactoryOrganization,
} from '../factory/organization'

const inputSchema = Organization.omit(['createdAt', 'updatedAt', 'deletedAt'])

const prisma = new PrismaClient()

interface UpdateOrganizationConfig {
  organizationTable: OrganizationTable
}

export interface UpdateOrganizationFnInput {
  organization: yup.InferType<typeof inputSchema>
}

type UpdateOrganizationFn = (
  input: UpdateOrganizationFnInput,
) => Promise<OrganizationFactoryOrganization>

type MakeUpdateOrganizationFn = (
  config?: UpdateOrganizationConfig,
) => UpdateOrganizationFn

const makeUpdateOrganization: MakeUpdateOrganizationFn =
  (
    { organizationTable } = {
      organizationTable: makeOrganizationTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.organization)

    let organization

    try {
      organization = await organizationTable.update({
        where: {
          id: validInput.id,
        },
        data: {
          name: validInput.name,
          role: validInput.role,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update organization')
    }

    return organizationFactory({
      organizationRecord: organization,
    })
  }

export { makeUpdateOrganization }
