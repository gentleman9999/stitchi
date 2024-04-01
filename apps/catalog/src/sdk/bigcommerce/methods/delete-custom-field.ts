import makeBigCommerceRepository, { BigCommerceRepository } from '../repository'
import { DeleteProductCustomFieldInput } from '../repository/product-custom-field/delete'

export type DeleteProductCustomFieldFn = (
  input: DeleteProductCustomFieldInput,
) => Promise<void>

interface Config {
  bigCommerceRepository: BigCommerceRepository
}

export const makeDeleteProductCustomFieldFn = (
  { bigCommerceRepository }: Config = {
    bigCommerceRepository: makeBigCommerceRepository(),
  },
): DeleteProductCustomFieldFn => {
  return async input => {
    await bigCommerceRepository.deleteProductCustomField(input)
  }
}
