import { makeCreateMembership } from './create-membership'
import { makeGetMembership } from './get-membership'
import { makeListMemberships } from './list-membership'
import { makeUpdateMembership } from './update-membership'

import { makeListActiveUserMemberships } from './list-active-user-memberships'
import { makeUpsertActiveUserMembership } from './upsert-active-user-membership'
import { makeDeleteActiveUserMembership } from './delete-active-user-membership'

import { makeCreateMembershipNotificationSetting } from './create-membership-notification-setting'
import { makeGetMembershipNotificationSetting } from './get-membership-notification-setting'
import { makeUpdateMembershipNotificationSetting } from './update-membership-notification-setting'
import { makeListMembershipNotificationSettings } from './list-membership-notification-settings'

export interface MembershipRepositoryInit {}

export interface MembershipRepository {
  createMembership: ReturnType<typeof makeCreateMembership>
  getMembership: ReturnType<typeof makeGetMembership>
  listMemberships: ReturnType<typeof makeListMemberships>
  updateMembership: ReturnType<typeof makeUpdateMembership>

  listActiveUserMemberships: ReturnType<typeof makeListActiveUserMemberships>
  upsertActiveUserMembership: ReturnType<typeof makeUpsertActiveUserMembership>
  deleteActiveUserMembership: ReturnType<typeof makeDeleteActiveUserMembership>

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
  updateMembership: makeUpdateMembership(),

  listActiveUserMemberships: makeListActiveUserMemberships(),
  upsertActiveUserMembership: makeUpsertActiveUserMembership(),
  deleteActiveUserMembership: makeDeleteActiveUserMembership(),

  createMembershipNotificationSetting:
    makeCreateMembershipNotificationSetting(),
  getMembershipNotificationSetting: makeGetMembershipNotificationSetting(),
  updateMembershipNotificationSetting:
    makeUpdateMembershipNotificationSetting(),
  listMembershipNotificationSettings: makeListMembershipNotificationSettings(),
})

export default makeMembershipRepository
