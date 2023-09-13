import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { OrganizationFileTable } from '../db/organization-file-table'

const prisma = new PrismaClient()

interface ListOrganizationFilesCountConfig {
  organizationFileTable: OrganizationFileTable
}

export interface ListOrganizationFilesCountFnInput
  extends Prisma.OrganizationFileCountArgs {}

type ListOrganizationFilesCountFn = (
  input: ListOrganizationFilesCountFnInput,
) => Promise<number>

type MakeListOrganizationFilesCountFn = (
  config?: ListOrganizationFilesCountConfig,
) => ListOrganizationFilesCountFn

const makeListOrganizationFilesCount: MakeListOrganizationFilesCountFn =
  (
    { organizationFileTable } = {
      organizationFileTable: prisma.organizationFile,
    },
  ) =>
  async input => {
    let organizationFileCount

    try {
      organizationFileCount = await organizationFileTable.count({
        ...input,
      })
    } catch (error) {
      logger
        .child({
          context: { error },
        })
        .error(`Failed to list organizationFiles`)
      throw new Error('Failed to list organizationFiles')
    }

    return organizationFileCount
  }

export { makeListOrganizationFilesCount }
