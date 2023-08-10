import { PrismaClient } from '@prisma/client'
import { OrganizationFileTable } from '../db/organization-file-table'
import {
  OrganizationFactoryOrganizationFile,
  organizationFileFactory,
} from '../factory/organization-file'

const primsa = new PrismaClient()

interface GetOrganizationFileConfig {
  organizationFileTable: OrganizationFileTable
}

export interface GetOrganizationFileFnInput {
  organizationFileId: string
}

type GetOrganizationFileFn = (
  input: GetOrganizationFileFnInput,
) => Promise<OrganizationFactoryOrganizationFile>

type MakeGetOrganizationFileFn = (
  config?: GetOrganizationFileConfig,
) => GetOrganizationFileFn

const makeGetOrganizationFile: MakeGetOrganizationFileFn =
  (
    { organizationFileTable } = {
      organizationFileTable: primsa.organizationFile,
    },
  ) =>
  async input => {
    const organizationFile = await organizationFileTable.findFirst({
      where: {
        id: input.organizationFileId,
        deletedAt: null,
      },
    })

    if (!organizationFile) {
      throw new Error(`OrganizationFile proof not found: ${input}`)
    }

    return organizationFileFactory({ organizationFileRecord: organizationFile })
  }

export { makeGetOrganizationFile }
