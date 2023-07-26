import { makeCreateMembership } from './create-membership'
import { makeGetMembership } from './get-membership'
import { makeListMemberships } from './list-membership'

import { makeListActiveUserMemberships } from './list-active-user-memberships'
import { makeCreateActiveUserMembership } from './create-active-user-membership'
import { makeUpdateActiveUserMembership } from './update-active-user-membership'

import { makeCreateMembershipNotificationSetting } from './create-membership-notification-setting'
import { makeGetMembershipNotificationSetting } from './get-membership-notification-setting'
import { makeUpdateMembershipNotificationSetting } from './update-membership-notification-setting'

export interface MembershipRepositoryInit {}

export interface MembershipRepository {
  createMembership: ReturnType<typeof makeCreateMembership>
  getMembership: ReturnType<typeof makeGetMembership>
  listMemberships: ReturnType<typeof makeListMemberships>

  listActiveUserMemberships: ReturnType<typeof makeListActiveUserMemberships>
  createActiveUserMembership: ReturnType<typeof makeCreateActiveUserMembership>
  updateActiveUserMembership: ReturnType<typeof makeUpdateActiveUserMembership>

  createMembershipNotificationSetting: ReturnType<
    typeof makeCreateMembershipNotificationSetting
  >
  getMembershipNotificationSetting: ReturnType<
    typeof makeGetMembershipNotificationSetting
  >
  updateMembershipNotificationSetting: ReturnType<
    typeof makeUpdateMembershipNotificationSetting
  >
}

type MakeMembershipRepositoryFn = (
  init?: MembershipRepositoryInit,
) => MembershipRepository

const makeMembershipRepository: MakeMembershipRepositoryFn = init => ({
  createMembership: makeCreateMembership(),
  getMembership: makeGetMembership(),
  listMemberships: makeListMemberships(),

  listActiveUserMemberships: makeListActiveUserMemberships(),
  createActiveUserMembership: makeCreateActiveUserMembership(),
  updateActiveUserMembership: makeUpdateActiveUserMembership(),

  createMembershipNotificationSetting:
    makeCreateMembershipNotificationSetting(),
  getMembershipNotificationSetting: makeGetMembershipNotificationSetting(),
  updateMembershipNotificationSetting:
    makeUpdateMembershipNotificationSetting(),
})

export default makeMembershipRepository
