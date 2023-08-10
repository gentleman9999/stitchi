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

const inputSchema = Organization.omit([
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
])

const prisma = new PrismaClient()

interface CreateOrganizationConfig {
  organizationTable: OrganizationTable
}

export interface CreateOrganizationFnInput {
  organization: yup.InferType<typeof inputSchema>
}

type CreateOrganizationFn = (
  input: CreateOrganizationFnInput,
) => Promise<OrganizationFactoryOrganization>

type MakeCreateOrganizationFn = (
  config?: CreateOrganizationConfig,
) => CreateOrganizationFn

const makeCreateOrganization: MakeCreateOrganizationFn =
  (
    { organizationTable } = {
      organizationTable: makeOrganizationTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.organization)

    let organization

    try {
      organization = await organizationTable.create({
        data: {
          name: validInput.name,
          role: validInput.role,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create organization')
    }

    return organizationFactory({
      organizationRecord: organization,
    })
  }

export { makeCreateOrganization }
