import { gql, useMutation } from '@apollo/client'
import { DesignRequestUpdateInput } from '@generated/globalTypes'
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
        console.error(error)
      } finally {
        setSaving(false)
      }
    },
    800,
    { leading: true },
  )

  return { handleUpdateDesignRequest }
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

export default useDesignRequestDraft
