import * as yup from 'yup'
import makeClient from '../../client'

export type DeleteProductVariantInput = {
  productId: number
  productVariantId: number
}

export type DeleteProductVariantFn = (
  input: DeleteProductVariantInput,
) => Promise<void>

interface Client {
  client: ReturnType<typeof makeClient>
}

const makeDeleteProductVariantFn = ({
  client,
}: Client): DeleteProductVariantFn => {
  return async input => {
    const [error] = await client.call(
      `/products/${input.productId}/variants/${input.productVariantId}`,
      yup.object(),
      {
        method: 'DELETE',
      },
    )

    if (error) {
      console.error('Error deleting product variant', {
        context: { error },
      })

      throw error
    }
  }
}

export default makeDeleteProductVariantFn
