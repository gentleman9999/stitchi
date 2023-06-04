import { BigCommerceClient } from '../../bigcommerce'
import {
  productFactory,
  productVariantFactory,
  ProductFactoryProduct,
  ProductFactoryProductVariant,
} from './factory'
import { makeClient as makeBigCommerceClient } from '../../bigcommerce'

export interface OrderClientService {
  getBigCommerceProduct: (input: {
    productEntityId: number
  }) => Promise<ProductFactoryProduct>
  getBigCommerceProductVariant: (input: {
    productEntityId: number
    variantEntityId: number
  }) => Promise<ProductFactoryProductVariant>
}

interface MakeClientParams {
  bigCommerceClient: BigCommerceClient
}

type MakeClientFn = (params?: MakeClientParams) => OrderClientService

const makeClient: MakeClientFn = (
  { bigCommerceClient } = { bigCommerceClient: makeBigCommerceClient() },
) => {
  return {
    getBigCommerceProduct: async input => {
      try {
        const product = await bigCommerceClient.getProduct({
          productEntityId: input.productEntityId,
        })

        return productFactory({ bigCommerceProduct: product })
      } catch (error) {
        console.error(`Failed to get product: ${input.productEntityId}`, {
          context: { error, productEntityId: input.productEntityId },
        })
        throw new Error('Failed to get product')
      }
    },

    getBigCommerceProductVariant: async input => {
      try {
        const productVariant = await bigCommerceClient.getProductVariant({
          productEntityId: input.productEntityId,
          variantEntityId: input.variantEntityId,
        })

        return productVariantFactory({
          bigCommerceProductVariant: productVariant,
        })
      } catch (error) {
        console.error(
          `Failed to get product variant: ${input.productEntityId}/${input.variantEntityId}`,
          {
            context: {
              error,
              productEntityId: input.productEntityId,
              variantEntityId: input.variantEntityId,
            },
          },
        )
        throw new Error('Failed to get product variant')
      }
    },
  }
}

export { makeClient }
