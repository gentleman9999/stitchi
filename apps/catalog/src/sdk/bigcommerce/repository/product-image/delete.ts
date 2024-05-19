import * as yup from 'yup'
import makeClient from '../../client'

const inputSchema = yup.object().shape({
  productId: yup.number().required(),
  imageId: yup.number().required(),
})

export type DeleteProductImageInput = yup.InferType<typeof inputSchema>

export type DeleteProductImageFn = (
  input: DeleteProductImageInput,
) => Promise<void>

interface Client {
  client: ReturnType<typeof makeClient>
}

const makeDeleteProductImageFn = ({ client }: Client): DeleteProductImageFn => {
  return async function deleteImage(input) {
    let validInput

    try {
      validInput = await inputSchema.validate(input)
    } catch (error) {
      console.error('Error validating product image input', {
        context: { error },
      })

      throw error
    }

    try {
      await client.call(
        `/products/${validInput.productId}/images/${validInput.imageId}`,
        undefined,
        {
          method: 'DELETE',
        },
      )
    } catch (error) {
      console.error('Error deleting product image', {
        context: { error },
      })

      throw error
    }
  }
}

export default makeDeleteProductImageFn
