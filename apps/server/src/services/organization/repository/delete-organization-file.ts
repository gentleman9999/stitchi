import { PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { OrganizationFileTable } from '../db/organization-file-table'
import {
  OrganizationFactoryOrganizationFile,
  organizationFileFactory,
} from '../factory/organization-file'

const primsa = new PrismaClient()

interface DeleteOrganizationFileConfig {
  organizationFileTable: OrganizationFileTable
}

export interface DeleteOrganizationFileFnInput {
  organizationFileId: string
}

type DeleteOrganizationFileFn = (
  input: DeleteOrganizationFileFnInput,
) => Promise<OrganizationFactoryOrganizationFile>

type MakeDeleteOrganizationFileFn = (
  config?: DeleteOrganizationFileConfig,
) => DeleteOrganizationFileFn

const makeDeleteOrganizationFile: MakeDeleteOrganizationFileFn =
  (
    { organizationFileTable } = {
      organizationFileTable: primsa.organizationFile,
    },
  ) =>
  async input => {
    let organizationFile

    try {
      organizationFile = await organizationFileTable.update({
        where: {
          id: input.organizationFileId,
        },
        data: {
          deletedAt: new Date(),
        },
      })
    } catch (error) {
      logger
        .child({
          context: { error, input },
        })
        .error('Unable to delete file')

      throw new Error('Unable to delete file')
    }

    return organizationFileFactory({ organizationFileRecord: organizationFile })
  }

export { makeDeleteOrganizationFile }
