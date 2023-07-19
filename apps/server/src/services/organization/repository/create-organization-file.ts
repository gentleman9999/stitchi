import {
  OrganizationFile,
  OrganizationFileTable,
  table as makeOrganizationFileTable,
} from '../db/organization-file-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import {
  organizationFileFactory,
  OrganizationFactoryOrganizationFile,
} from '../factory/organization-file'

const inputSchema = OrganizationFile.omit([
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
])

const prisma = new PrismaClient()

interface CreateOrganizationFileConfig {
  organizationFileTable: OrganizationFileTable
}

export interface CreateOrganizationFileFnInput {
  organizationFile: yup.InferType<typeof inputSchema>
}

type CreateOrganizationFileFn = (
  input: CreateOrganizationFileFnInput,
) => Promise<OrganizationFactoryOrganizationFile>

type MakeCreateOrganizationFileFn = (
  config?: CreateOrganizationFileConfig,
) => CreateOrganizationFileFn

const makeCreateOrganizationFile: MakeCreateOrganizationFileFn =
  (
    { organizationFileTable } = {
      organizationFileTable: makeOrganizationFileTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.organizationFile)

    let organizationFile

    try {
      organizationFile = await organizationFileTable.create({
        data: {
          userId: validInput.userId,
          organizationId: validInput.organizationId,
          fileId: validInput.fileId,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create organizationFile')
    }

    return organizationFileFactory({
      organizationFileRecord: organizationFile,
    })
  }

export { makeCreateOrganizationFile }
