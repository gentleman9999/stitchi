import { gql, useMutation } from '@apollo/client'
import { DesignRequestApproveInput } from '@generated/globalTypes'
import {
  UseCreateDesignSildeOverApproveDesignMutation,
  UseCreateDesignSildeOverApproveDesignMutationVariables,
} from '@generated/UseCreateDesignSildeOverApproveDesignMutation'

const useCreateDesignSlideOver = () => {
  const [approveDesign, { loading, error }] = useMutation<
    UseCreateDesignSildeOverApproveDesignMutation,
    UseCreateDesignSildeOverApproveDesignMutationVariables
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
  mutation UseCreateDesignSildeOverApproveDesignMutation(
    $input: DesignRequestApproveInput!
  ) {
    designRequestApprove(input: $input) {
      designRequest {
        id
      }
      design {
        id
      }
    }
  }
`

export default useCreateDesignSlideOver
