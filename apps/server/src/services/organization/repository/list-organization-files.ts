import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { OrganizationFileTable } from '../db/organization-file-table'
import {
  OrganizationFactoryOrganizationFile,
  organizationFileFactory,
} from '../factory/organization-file'

const prisma = new PrismaClient()

interface ListOrganizationFilesConfig {
  organizationFileTable: OrganizationFileTable
}

export interface ListOrganizationFilesFnInput
  extends Omit<Prisma.OrganizationFileFindManyArgs, 'include' | 'select'> {}

type ListOrganizationFilesFn = (
  input: ListOrganizationFilesFnInput,
) => Promise<OrganizationFactoryOrganizationFile[]>

type MakeListOrganizationFilesFn = (
  config?: ListOrganizationFilesConfig,
) => ListOrganizationFilesFn

const makeListOrganizationFiles: MakeListOrganizationFilesFn =
  (
    { organizationFileTable } = {
      organizationFileTable: prisma.organizationFile,
    },
  ) =>
  async input => {
    let organizationFileRecords

    try {
      organizationFileRecords = await organizationFileTable.findMany({
        ...input,
        where: {
          deletedAt: null,
          ...input.where,
        },
      })
    } catch (error) {
      logger
        .child({
          context: { error },
        })
        .error(`Failed to get organization files`)
      throw new Error('Failed to get organization files')
    }

    return organizationFileRecords.map(file =>
      organizationFileFactory({
        organizationFileRecord: file,
      }),
    )
  }

export { makeListOrganizationFiles }
