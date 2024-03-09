import makeBigCommerceRepository, { BigCommerceRepository } from '../repository'
import { DeleteProductsInput } from '../repository/product/delete'

export type DeleteProductsFn = (input: DeleteProductsInput) => Promise<void>

interface Client {
  bigCommerceRepository: BigCommerceRepository
}

export const makeDeleteProductsFn = (
  { bigCommerceRepository }: Client = {
    bigCommerceRepository: makeBigCommerceRepository(),
  },
): DeleteProductsFn => {
  return async input => {
    await bigCommerceRepository.deleteProduct(input)
  }
}
