import { makeCreateMembership } from './create-membership'
import { makeGetMembership } from './get-membership'
import { makeListMemberships } from './list-membership'

import { makeListActiveUserMemberships } from './list-active-user-memberships'
import { makeUpsertActiveUserMembership } from './upsert-active-user-membership'

import { makeCreateMembershipNotificationSetting } from './create-membership-notification-setting'
import { makeGetMembershipNotificationSetting } from './get-membership-notification-setting'
import { makeUpdateMembershipNotificationSetting } from './update-membership-notification-setting'
import { makeListMembershipNotificationSettings } from './list-membership-notification-settings'

export interface MembershipRepositoryInit {}

export interface MembershipRepository {
  createMembership: ReturnType<typeof makeCreateMembership>
  getMembership: ReturnType<typeof makeGetMembership>
  listMemberships: ReturnType<typeof makeListMemberships>

  listActiveUserMemberships: ReturnType<typeof makeListActiveUserMemberships>
  upsertActiveUserMembership: ReturnType<typeof makeUpsertActiveUserMembership>

  createMembershipNotificationSetting: ReturnType<
    typeof makeCreateMembershipNotificationSetting
  >
  getMembershipNotificationSetting: ReturnType<
    typeof makeGetMembershipNotificationSetting
  >
  updateMembershipNotificationSetting: ReturnType<
    typeof makeUpdateMembershipNotificationSetting
  >
  listMembershipNotificationSettings: ReturnType<
    typeof makeListMembershipNotificationSettings
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
  upsertActiveUserMembership: makeUpsertActiveUserMembership(),

  createMembershipNotificationSetting:
    makeCreateMembershipNotificationSetting(),
  getMembershipNotificationSetting: makeGetMembershipNotificationSetting(),
  updateMembershipNotificationSetting:
    makeUpdateMembershipNotificationSetting(),
  listMembershipNotificationSettings: makeListMembershipNotificationSettings(),
})

export default makeMembershipRepository
