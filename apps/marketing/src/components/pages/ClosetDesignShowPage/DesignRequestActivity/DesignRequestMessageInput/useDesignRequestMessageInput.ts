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

interface Props {
  designRequestId: string
}

const useDesignRequestMessageInput = ({ designRequestId }: Props) => {
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
    input: Omit<DesignRequestRevisionRequestCreateInput, 'designRequestId'>,
  ) => {
    await submitRevisionRequest({
      variables: { input: { ...input, designRequestId } },
    })
  }

  const handleSubmitComment = async (
    input: Omit<DesignRequestConversationMessageCreateInput, 'designRequestId'>,
  ) => {
    await addComment({
      variables: { input: { ...input, designRequestId } },
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
