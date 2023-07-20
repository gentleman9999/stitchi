import { MembershipFactoryMembership } from '../../services/membership/factory/membership'
import { NexusGenObjects } from '../generated/nexus'

export const membershipFactoryToGrahpql = (
  membership: MembershipFactoryMembership,
): NexusGenObjects['Membership'] => {
  return {
    id: membership.id,
    organizationId: membership.organizationId,
    userId: membership.userId,

    role: membership.role,

    createdAt: membership.createdAt,
    updatedAt: membership.updatedAt,
  }
}
