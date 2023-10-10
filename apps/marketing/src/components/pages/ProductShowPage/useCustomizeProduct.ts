import { gql, useMutation } from '@apollo/client'
import { CatalogProductCustomizeInput } from '@generated/globalTypes'
import {
  UseCustomizeProductCustomizeMutation,
  UseCustomizeProductCustomizeMutationVariables,
} from '@generated/UseCustomizeProductCustomizeMutation'

const useCustomizeProduct = () => {
  const [customize, customizeMutation] = useMutation<
    UseCustomizeProductCustomizeMutation,
    UseCustomizeProductCustomizeMutationVariables
  >(CUSTOMIZE)

  const handleCustomize = async (input: CatalogProductCustomizeInput) => {
    const result = await customize({
      variables: {
        input,
      },
    })

    return {
      order: result.data?.catalogProductCustomize?.order,
      designRequest: result.data?.catalogProductCustomize?.designRequest,
    }
  }

  return [
    handleCustomize,
    {
      ...customizeMutation,
      order: customizeMutation.data?.catalogProductCustomize?.order,
      designRequest:
        customizeMutation.data?.catalogProductCustomize?.designRequest,
    },
  ] as const
}

const CUSTOMIZE = gql`
  mutation UseCustomizeProductCustomizeMutation(
    $input: CatalogProductCustomizeInput!
  ) {
    catalogProductCustomize(input: $input) {
      designRequest {
        id
        membershipId
      }
      order {
        id
      }
    }
  }
`

export default useCustomizeProduct
