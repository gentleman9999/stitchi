import { gql, useMutation } from '@apollo/client'
import { OrganizationUpdateInput } from '@generated/globalTypes'
import {
  UseClosetSettingsOrganizationPageUpdateOrganizationMutation,
  UseClosetSettingsOrganizationPageUpdateOrganizationMutationVariables,
} from '@generated/UseClosetSettingsOrganizationPageUpdateOrganizationMutation'

const useClosetSettingsOrganizationPage = () => {
  const [updateOrganization] = useMutation<
    UseClosetSettingsOrganizationPageUpdateOrganizationMutation,
    UseClosetSettingsOrganizationPageUpdateOrganizationMutationVariables
  >(UPDATE_ORGANIZATION, {
    update(cache, { data }) {
      const organization = data?.organizationUpdate?.organization

      if (organization) {
        cache.evict({ id: cache.identify({ ...organization }) })
        cache.gc()
      }
    },
  })

  const handleUpdateOrganization = async (input: OrganizationUpdateInput) => {
    return updateOrganization({
      variables: {
        input,
      },
    })
  }

  return { handleUpdateOrganization }
}

const UPDATE_ORGANIZATION = gql`
  mutation UseClosetSettingsOrganizationPageUpdateOrganizationMutation(
    $input: OrganizationUpdateInput!
  ) {
    organizationUpdate(input: $input) {
      organization {
        id
      }
    }
  }
`

export default useClosetSettingsOrganizationPage
