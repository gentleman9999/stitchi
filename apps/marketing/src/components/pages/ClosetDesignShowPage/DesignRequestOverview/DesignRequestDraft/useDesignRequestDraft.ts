import { gql, useMutation } from '@apollo/client'
import {
  DesignRequestDesignLocationDeleteInput,
  DesignRequestUpdateInput,
} from '@generated/globalTypes'
import {
  UseDesignRequestDraftRemoveDesignRequestLocationMutation,
  UseDesignRequestDraftRemoveDesignRequestLocationMutationVariables,
} from '@generated/UseDesignRequestDraftRemoveDesignRequestLocationMutation'
import {
  UseDesignRequestDraftUpdateDesignRequestMutation,
  UseDesignRequestDraftUpdateDesignRequestMutationVariables,
} from '@generated/UseDesignRequestDraftUpdateDesignRequestMutation'
import { useDebouncedCallback } from 'use-debounce'
import { useDesignContext } from '../../design-context'

interface Props {
  designRequestId: string
}

const useDesignRequestDraft = ({ designRequestId }: Props) => {
  const { setSaving } = useDesignContext()

  const [updateDesignRequest] = useMutation<
    UseDesignRequestDraftUpdateDesignRequestMutation,
    UseDesignRequestDraftUpdateDesignRequestMutationVariables
  >(UPDATE_DESIGN_REQUEST, {
    update(cache, { data }) {
      const designRequest = data?.designRequestUpdate?.designRequest
      if (designRequest) {
        cache.evict({ id: cache.identify({ ...designRequest }) })
        cache.gc()
      }
    },
  })

  const [removeDesignRequestLocation] = useMutation<
    UseDesignRequestDraftRemoveDesignRequestLocationMutation,
    UseDesignRequestDraftRemoveDesignRequestLocationMutationVariables
  >(REMOVE_DESIGN_REQUEST_LOCATION, {
    update(cache, { data }) {
      const designRequest =
        data?.designRequestDesignLocationDelete?.designRequest

      if (designRequest) {
        cache.evict({ id: cache.identify({ ...designRequest }) })
        cache.gc()
      }
    },
  })

  const handleUpdateDesignRequest = useDebouncedCallback(
    async (input: Omit<DesignRequestUpdateInput, 'designRequestId'>) => {
      setSaving(true)
      try {
        await updateDesignRequest({
          variables: {
            input: {
              designRequestId,
              ...input,
            },
          },
        })
      } catch (error) {
        console.log(error)
      } finally {
        setSaving(false)
      }
    },
    800,
    { leading: true },
  )

  const handleRemoveDesignRequestLocation = async (
    input: Omit<DesignRequestDesignLocationDeleteInput, 'designRequestId'>,
  ) => {
    setSaving(true)
    try {
      await removeDesignRequestLocation({
        variables: {
          input: {
            designRequestId,
            ...input,
          },
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setSaving(false)
    }
  }

  return { handleUpdateDesignRequest, handleRemoveDesignRequestLocation }
}

const UPDATE_DESIGN_REQUEST = gql`
  mutation UseDesignRequestDraftUpdateDesignRequestMutation(
    $input: DesignRequestUpdateInput!
  ) {
    designRequestUpdate(input: $input) {
      designRequest {
        id
      }
    }
  }
`

const REMOVE_DESIGN_REQUEST_LOCATION = gql`
  mutation UseDesignRequestDraftRemoveDesignRequestLocationMutation(
    $input: DesignRequestDesignLocationDeleteInput!
  ) {
    designRequestDesignLocationDelete(input: $input) {
      designRequest {
        id
      }
    }
  }
`

export default useDesignRequestDraft
