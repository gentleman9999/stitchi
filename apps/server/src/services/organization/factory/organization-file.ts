import { OrganizationFileRecord } from '../db/organization-file-table'

export interface OrganizationFactoryOrganizationFile
  extends OrganizationFileRecord {}

const organizationFileFactory = ({
  organizationFileRecord,
}: {
  organizationFileRecord: OrganizationFileRecord
}): OrganizationFactoryOrganizationFile => {
  return {
    id: organizationFileRecord.id,
    fileId: organizationFileRecord.fileId,
    organizationId: organizationFileRecord.organizationId,
    userId: organizationFileRecord.userId,
    createdAt: organizationFileRecord.createdAt,
    updatedAt: organizationFileRecord.updatedAt,
    deletedAt: organizationFileRecord.deletedAt,
  }
}

export { organizationFileFactory }
