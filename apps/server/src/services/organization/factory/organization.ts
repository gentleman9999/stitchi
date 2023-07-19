import { OrganizationRecord } from '../db/organization-table'

export interface OrganizationFactoryOrganization extends OrganizationRecord {}

const organizationFactory = ({
  organizationRecord,
}: {
  organizationRecord: OrganizationRecord
}): OrganizationFactoryOrganization => {
  return {
    id: organizationRecord.id,
    name: organizationRecord.name,
    role: organizationRecord.role,
    createdAt: organizationRecord.createdAt,
    updatedAt: organizationRecord.updatedAt,
    deletedAt: organizationRecord.deletedAt,
  }
}

export { organizationFactory }
