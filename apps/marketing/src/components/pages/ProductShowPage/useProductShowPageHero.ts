import { gql, useMutation } from '@apollo/client'
import {
  UseProductShowPageHeroCreateDesignRequestMutation,
  UseProductShowPageHeroCreateDesignRequestMutationVariables,
} from '@generated/UseProductShowPageHeroCreateDesignRequestMutation'

interface Props {
  productName: string
  productEntityId: number
}

const useProductShowPageHero = ({ productEntityId, productName }: Props) => {
  const [createDesignRequest, createDesignRequestMutation] = useMutation<
    UseProductShowPageHeroCreateDesignRequestMutation,
    UseProductShowPageHeroCreateDesignRequestMutationVariables
  >(CREATE_DESIGN_REQUEST)

  const handleCreateDesignRequest = async ({
    colorEntityIds,
  }: {
    colorEntityIds: number[]
  }) => {
    const { data } = await createDesignRequest({
      variables: {
        input: {
          name: productName,
          products: [
            {
              bigCommerceProductId: productEntityId.toString(),
              bigCommerceProductColorIds: colorEntityIds.map(id =>
                id.toString(),
              ),
            },
          ],
        },
      },
    })

    return data?.designRequestCreate?.designRequest
  }

  return { handleCreateDesignRequest, createDesignRequestMutation } as const
}

const CREATE_DESIGN_REQUEST = gql`
  mutation UseProductShowPageHeroCreateDesignRequestMutation(
    $input: DesignRequestCreateInput!
  ) {
    designRequestCreate(input: $input) {
      designRequest {
        id
      }
    }
  }
`

export default useProductShowPageHero
