import { gql, useMutation } from '@apollo/client'
import { DesignRequestProofCreateInput } from '@generated/globalTypes'
import {
  UseCreateProofCreateProof,
  UseCreateProofCreateProofVariables,
} from '@generated/UseCreateProofCreateProof'

const useCreateProof = () => {
  const [createProof, createProofMutation] = useMutation<
    UseCreateProofCreateProof,
    UseCreateProofCreateProofVariables
  >(CREATE_PROOF, {
    update(cache, { data }) {
      const designRequest = data?.designRequestProofCreate?.designRequest

      if (designRequest) {
        cache.evict({ id: cache.identify({ ...designRequest }) })
        cache.gc()
      }
    },
  })

  const handleCreateProof = async (input: DesignRequestProofCreateInput) => {
    const response = await createProof({
      variables: { input },
    })

    return response.data?.designRequestProofCreate?.designRequest
  }

  return [handleCreateProof, createProofMutation] as const
}

const CREATE_PROOF = gql`
  mutation UseCreateProofCreateProof($input: DesignRequestProofCreateInput!) {
    designRequestProofCreate(input: $input) {
      designRequest {
        id
      }
    }
  }
`

export default useCreateProof
