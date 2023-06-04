import { gql } from '@apollo/client'
import {
  GetProductVariantByOptions,
  GetProductVariantByOptionsVariables,
} from '@generated/getProductVariantByOptions'
import { initializeApollo } from '@lib/apollo'

const client = initializeApollo()

const getProductVariantByOptions = async (
  variables: GetProductVariantByOptionsVariables,
) => {
  const { data } = await client.query<
    GetProductVariantByOptions,
    GetProductVariantByOptionsVariables
  >({
    query: GET_DATA,
    variables,
  })

  return data.site.product?.variants.edges?.[0]?.node || null
}

const GET_DATA = gql`
  query GetProductVariantByOptions(
    $productEntityId: Int!
    $optionValueIds: [OptionValueId!]!
  ) {
    site {
      product(entityId: $productEntityId) {
        id
        variants(first: 1, optionValueIds: $optionValueIds) {
          edges {
            node {
              id
              entityId
            }
          }
        }
      }
    }
  }
`

export { getProductVariantByOptions }
