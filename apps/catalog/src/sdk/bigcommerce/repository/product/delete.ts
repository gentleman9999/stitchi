import makeClient from '../../client'
import * as yup from 'yup'

export type DeleteProductsInput = {
  ids: number[]
}

export type DeleteProductsFn = (input: DeleteProductsInput) => Promise<void>

interface Client {
  client: ReturnType<typeof makeClient>
}

const makeDeleteProductsFn = ({ client }: Client): DeleteProductsFn => {
  return async input => {
    const [error] = await client.call(
      `/products?id:in=${input.ids.join(',')}`,
      yup.object(),
      {
        method: 'DELETE',
      },
    )

    if (error) {
      console.error('Error deleting product', {
        context: { error },
      })

      throw error
    }
  }
}

export default makeDeleteProductsFn
