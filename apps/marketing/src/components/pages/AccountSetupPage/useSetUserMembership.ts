import { gql, useMutation } from '@apollo/client'
import {
  UseSetUserOrganizationSetMembershipMutation,
  UseSetUserOrganizationSetMembershipMutationVariables,
} from '@generated/UseSetUserOrganizationSetMembershipMutation'

const useSetUserMembership = () => {
  const [setMembership, setMembershipMutation] = useMutation<
    UseSetUserOrganizationSetMembershipMutation,
    UseSetUserOrganizationSetMembershipMutationVariables
  >(SET_MEMBERSHIP)

  const handleSetMembership = async (input: {
    membershipId: string
    organizationId: string
  }) => {
    await setMembership({ variables: { input } })
  }

  return [handleSetMembership, setMembershipMutation] as const
}

const SET_MEMBERSHIP = gql`
  mutation UseSetUserOrganizationSetMembershipMutation(
    $input: UserSetOrganizationInput!
  ) {
    userSetOrganization(input: $input) {
      membershipId
    }
  }
`

export default useSetUserMembership
