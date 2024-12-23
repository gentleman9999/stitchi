import { MembershipRecord } from '../db/membership-table'

export interface MembershipFactoryMembership extends MembershipRecord {}

const membershipFactory = ({
  membershipRecord,
}: {
  membershipRecord: MembershipRecord
}): MembershipFactoryMembership => {
  return {
    id: membershipRecord.id,
    role: membershipRecord.role,
    organizationId: membershipRecord.organizationId,
    userId: membershipRecord.userId,
    invitedName: membershipRecord.invitedName,
    invitedEmail: membershipRecord.invitedEmail,
    membershipNotificationSettingId:
      membershipRecord.membershipNotificationSettingId,

    createdAt: membershipRecord.createdAt,
    updatedAt: membershipRecord.updatedAt,
    deletedAt: membershipRecord.deletedAt,
  }
}

export { membershipFactory }
