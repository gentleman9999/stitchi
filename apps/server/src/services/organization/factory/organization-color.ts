import { OrganizationColorRecord } from '../db/organization-color-table'

export interface OrganizationFactoryOrganizationColor
  extends OrganizationColorRecord {}

const organizationColorFactory = ({
  organizationColorRecord,
}: {
  organizationColorRecord: OrganizationColorRecord
}): OrganizationFactoryOrganizationColor => {
  return {
    id: organizationColorRecord.id,
    organizationId: organizationColorRecord.organizationId,

    hex: organizationColorRecord.hex,
    name: organizationColorRecord.name,

    createdAt: organizationColorRecord.createdAt,
    updatedAt: organizationColorRecord.updatedAt,
    deletedAt: organizationColorRecord.deletedAt,
  }
}

export { organizationColorFactory }
