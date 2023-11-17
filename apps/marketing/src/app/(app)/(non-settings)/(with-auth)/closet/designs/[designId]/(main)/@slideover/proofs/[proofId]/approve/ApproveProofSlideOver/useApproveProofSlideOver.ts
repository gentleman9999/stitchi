import { gql, useMutation } from '@apollo/client'
import { DesignRequestApproveInput } from '@generated/globalTypes'
import {
  UseApproveProofSildeOverApproveDesignMutation,
  UseApproveProofSildeOverApproveDesignMutationVariables,
} from '@generated/types'

const useApproveProofSlideOver = () => {
  const [approveDesign, { loading, error }] = useMutation<
    UseApproveProofSildeOverApproveDesignMutation,
    UseApproveProofSildeOverApproveDesignMutationVariables
  >(APPROVE_DESIGN)

  const handleApproveDesign = async (
    input: Omit<DesignRequestApproveInput, ''>,
  ) => {
    const res = await approveDesign({
      variables: {
        input,
      },
    })

    return res.data?.designRequestApprove
  }

  return [handleApproveDesign, { loading, error }] as const
}

const APPROVE_DESIGN = gql`
  mutation UseApproveProofSildeOverApproveDesignMutation(
    $input: DesignRequestApproveInput!
  ) {
    designRequestApprove(input: $input) {
      designRequest {
        id
      }
    }
  }
`

export default useApproveProofSlideOver
