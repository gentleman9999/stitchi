import { gql } from '@apollo/client'

export const fragments = {
  invite: gql`
    fragment AccountMembershipAcceptPageMembershipInviteFragment on MembershipInvite {
      id
      membershipId
      invitedEmail
      organizationName
    }
  `,
}
