import fetch from 'node-fetch'
import { getOrThrow } from '../../utils'
import * as yup from 'yup'

const endpoint = getOrThrow(
  process.env.BIGCOMMERCE_API_URI,
  'BIGCOMMERCE_API_URI',
)

const token = getOrThrow(
  process.env.BIGCOMMERCE_API_TOKEN,
  'BIGCOMMERCE_API_TOKEN',
)

interface CatalogClientService {
  getProductPrice: (variantEntityId: number) => Promise<number>
}

interface MakeClientPramam {}

type MakeClientFn = (params?: MakeClientPramam) => CatalogClientService

const getProductDataQuerySchema = yup.object({
  data: yup
    .object({
      site: yup
        .object({
          product: yup
            .object({
              variants: yup
                .object({
                  edges: yup
                    .array()
                    .of(
                      yup
                        .object({
                          node: yup
                            .object({
                              prices: yup
                                .object({
                                  price: yup
                                    .object({
                                      value: yup.number().nullable(),
                                    })
                                    .nullable(),
                                })
                                .nullable(),
                            })
                            .nullable(),
                        })
                        .nullable(),
                    )
                    .nullable(),
                })
                .nullable(),
            })
            .nullable(),
        })
        .nullable(),
    })
    .nullable(),
})

const productQuery = /* GraphQL */ `
  query GetProductData($variantEntityId: Int!) {
    site {
      product(variantEntityId: $variantEntityId) {
        id
        variants(entityIds: [$variantEntityId], first: 1) {
          edges {
            node {
              id
              prices {
                price {
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`

const makeClient: MakeClientFn = () => {
  return {
    getProductPrice: async variantEntityId => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: productQuery,
          variables: { variantEntityId },
        }),
      })

      try {
        const { data } = getProductDataQuerySchema.validateSync(
          await response.json(),
        )

        const price =
          data?.site?.product?.variants?.edges?.[0]?.node?.prices?.price?.value

        if (typeof price !== 'number') {
          throw new Error('Price not found')
        }

        return price
      } catch (error) {
        console.error('Error parsing response', {
          context: {
            error: error,
          },
        })
        throw error
      }
    },
  }
}

export { makeClient }
