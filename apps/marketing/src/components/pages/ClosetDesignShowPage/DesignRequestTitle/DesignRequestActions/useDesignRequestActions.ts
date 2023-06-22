import { gql, useMutation } from '@apollo/client'
import {
  UseDesignRequestActionsSubmitDesignRequestMutation,
  UseDesignRequestActionsSubmitDesignRequestMutationVariables,
} from '@generated/UseDesignRequestActionsSubmitDesignRequestMutation'
import { useState } from 'react'

interface Props {
  designRequestId: string
}

const useDesignRequestActions = ({ designRequestId }: Props) => {
  const [submitting, setSubmitting] = useState(false)

  const [submitDesignRequest] = useMutation<
    UseDesignRequestActionsSubmitDesignRequestMutation,
    UseDesignRequestActionsSubmitDesignRequestMutationVariables
  >(SUBMIT_DESIGN_REQUEST, {
    update(cache, { data }) {
      const designRequest = data?.designRequestSubmit?.designRequest

      if (designRequest) {
        cache.evict({ id: cache.identify({ ...designRequest }) })
        cache.gc()
      }
    },
  })

  const handleSubmitDesignRequest = async () => {
    setSubmitting(true)
    try {
      await submitDesignRequest({ variables: { input: { designRequestId } } })
    } catch (error) {
      throw error
    } finally {
      setSubmitting(false)
    }
  }

  return {
    submitting,
    handleSubmitDesignRequest,
  }
}

const SUBMIT_DESIGN_REQUEST = gql`
  mutation UseDesignRequestActionsSubmitDesignRequestMutation(
    $input: DesignRequestSubmitInput!
  ) {
    designRequestSubmit(input: $input) {
      designRequest {
        id
      }
    }
  }
`

export default useDesignRequestActions
