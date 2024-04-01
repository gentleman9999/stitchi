import makeClient from '../../client'
import * as yup from 'yup'

export interface DeleteProductCustomFieldInput {
  productId: number
  customFieldId: number
}

export type DeleteProductCustomFieldFn = (
  input: DeleteProductCustomFieldInput,
) => Promise<void>

interface Config {
  client: ReturnType<typeof makeClient>
}

const makeDeleteProductCustomFieldFn = ({
  client,
}: Config): DeleteProductCustomFieldFn => {
  return async input => {
    const [error] = await client.call(
      `/products/${input.productId}/custom-fields/${input.customFieldId}`,
      yup.object(),
      {
        method: 'DELETE',
      },
    )

    if (error) {
      console.error('Error deleting product custom field', {
        context: { error },
      })

      throw error
    }
  }
}

export default makeDeleteProductCustomFieldFn
