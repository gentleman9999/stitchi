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
    colorId: organizationColorRecord.colorId,

    createdAt: organizationColorRecord.createdAt,
    updatedAt: organizationColorRecord.updatedAt,
    deletedAt: organizationColorRecord.deletedAt,
  }
}

export { organizationColorFactory }
