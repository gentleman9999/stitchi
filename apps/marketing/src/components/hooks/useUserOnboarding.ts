import { gql, useMutation, useSuspenseQuery } from '@apollo/client'
import { UserOnboardingUpdateInput } from '@generated/globalTypes'
import { UseUserOnboardingGetDataQuery } from '@generated/UseUserOnboardingGetDataQuery'
import {
  UseUserOnboardingUpdateOnboardingMutation,
  UseUserOnboardingUpdateOnboardingMutationVariables,
} from '@generated/UseUserOnboardingUpdateOnboardingMutation'
import React from 'react'

const useUserOnboarding = () => {
  const [updating, setUpdating] = React.useState(false)
  const { data } = useSuspenseQuery<UseUserOnboardingGetDataQuery>(GET_DATA)
  const [updateOnboarding] = useMutation<
    UseUserOnboardingUpdateOnboardingMutation,
    UseUserOnboardingUpdateOnboardingMutationVariables
  >(UPDATE_ONBOARDING, {
    update(cache, { data }) {
      const onboarding = data?.userOnboardingUpdate?.userOnboarding

      if (onboarding) {
        cache.evict({ id: cache.identify({ ...onboarding }) })
        cache.gc()
      }
    },
  })

  const handleUpdate = async (input: UserOnboardingUpdateInput) => {
    setUpdating(true)
    if (!updating) {
      await updateOnboarding({
        variables: {
          input,
        },
      })
    }

    setUpdating(false)
  }

  return {
    onboarding: data.viewer?.user?.onboarding,
    update: handleUpdate,
    updating,
  }
}

const GET_DATA = gql`
  query UseUserOnboardingGetDataQuery {
    viewer {
      id
      user {
        id
        onboarding {
          id
          seenDesignRequestDraftOnboarding
          seenDesignIndexPageOnboardingBanner
          seenInventoryIndexPageOnboardingBanner
        }
      }
    }
  }
`

const UPDATE_ONBOARDING = gql`
  mutation UseUserOnboardingUpdateOnboardingMutation(
    $input: UserOnboardingUpdateInput!
  ) {
    userOnboardingUpdate(input: $input) {
      userOnboarding {
        id
      }
    }
  }
`

export default useUserOnboarding
