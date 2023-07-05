import { gql, useMutation } from '@apollo/client'
import {
  DesignRequestConversationMessageCreateInput,
  DesignRequestRevisionRequestCreateInput,
} from '@generated/globalTypes'
import {
  UseDesignRequestMessageInputAddCommentMutation,
  UseDesignRequestMessageInputAddCommentMutationVariables,
} from '@generated/UseDesignRequestMessageInputAddCommentMutation'
import {
  UseDesignRequestMessageInputSubmitRevisionRequestMutation,
  UseDesignRequestMessageInputSubmitRevisionRequestMutationVariables,
} from '@generated/UseDesignRequestMessageInputSubmitRevisionRequestMutation'

const useDesignRequestMessageInput = () => {
  const [submitRevisionRequest, submitRevisionRequestMutation] = useMutation<
    UseDesignRequestMessageInputSubmitRevisionRequestMutation,
    UseDesignRequestMessageInputSubmitRevisionRequestMutationVariables
  >(SUBMIT_REVISION_REQUEST, {
    update: (cache, { data }) => {
      const designRequest =
        data?.designRequestRevisionRequestCreate?.designRequest

      if (designRequest) {
        cache.evict({ id: cache.identify({ ...designRequest }) })
        cache.gc()
      }
    },
  })

  const [addComment, addCommentMutation] = useMutation<
    UseDesignRequestMessageInputAddCommentMutation,
    UseDesignRequestMessageInputAddCommentMutationVariables
  >(ADD_COMMENT, {
    update: (cache, { data }) => {
      const designRequest =
        data?.designRequestConversationMessageCreate?.designRequest

      if (designRequest) {
        cache.evict({ id: cache.identify({ ...designRequest }) })
        cache.gc()
      }
    },
  })

  const handleSubmitRevisionRequest = async (
    input: DesignRequestRevisionRequestCreateInput,
  ) => {
    await submitRevisionRequest({
      variables: { input: { ...input } },
    })
  }

  const handleSubmitComment = async (
    input: DesignRequestConversationMessageCreateInput,
  ) => {
    await addComment({
      variables: { input: { ...input } },
    })
  }

  return {
    handleSubmitRevisionRequest,
    handleSubmitComment,
  }
}

const ADD_COMMENT = gql`
  mutation UseDesignRequestMessageInputAddCommentMutation(
    $input: DesignRequestConversationMessageCreateInput!
  ) {
    designRequestConversationMessageCreate(input: $input) {
      designRequest {
        id
      }
    }
  }
`

const SUBMIT_REVISION_REQUEST = gql`
  mutation UseDesignRequestMessageInputSubmitRevisionRequestMutation(
    $input: DesignRequestRevisionRequestCreateInput!
  ) {
    designRequestRevisionRequestCreate(input: $input) {
      designRequest {
        id
      }
    }
  }
`

export default useDesignRequestMessageInput
