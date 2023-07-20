import { makeCreateMembership } from './create-membership'
import { makeGetMembership } from './get-membership'
import { makeListMemberships } from './list-membership'

import { makeListActiveUserMemberships } from './list-active-user-memberships'
import { makeCreateActiveUserMembership } from './create-active-user-membership'
import { makeUpdateActiveUserMembership } from './update-active-user-membership'

export interface MembershipRepositoryInit {}

export interface MembershipRepository {
  createMembership: ReturnType<typeof makeCreateMembership>
  getMembership: ReturnType<typeof makeGetMembership>
  listMemberships: ReturnType<typeof makeListMemberships>

  listActiveUserMemberships: ReturnType<typeof makeListActiveUserMemberships>
  createActiveUserMembership: ReturnType<typeof makeCreateActiveUserMembership>
  updateActiveUserMembership: ReturnType<typeof makeUpdateActiveUserMembership>
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
})

export default makeMembershipRepository
