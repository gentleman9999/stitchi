import { ActiveUserMembershipRecord } from '../db/active-user-membership-table'

export interface ActiveUserMembershipFactoryActiveUserMembership
  extends ActiveUserMembershipRecord {}

const activeUserMembershipFactory = ({
  activeUserMembershipRecord,
}: {
  activeUserMembershipRecord: ActiveUserMembershipRecord
}): ActiveUserMembershipFactoryActiveUserMembership => {
  return {
    id: activeUserMembershipRecord.id,
    organizationId: activeUserMembershipRecord.organizationId,
    userId: activeUserMembershipRecord.userId,
    membershipId: activeUserMembershipRecord.membershipId,
  }
}

export { activeUserMembershipFactory }
