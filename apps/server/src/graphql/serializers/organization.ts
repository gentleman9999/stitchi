import { OrganizationFactoryOrganization } from '../../services/organization/factory/organization'
import { NexusGenObjects } from '../generated/nexus'

export const organizationFactoryToGrahpql = (
  organization: OrganizationFactoryOrganization,
): NexusGenObjects['Organization'] => {
  return {
    id: organization.id,

    name: organization.name,
    role: organization.role,

    createdAt: organization.createdAt,
    updatedAt: organization.updatedAt,
  }
}
