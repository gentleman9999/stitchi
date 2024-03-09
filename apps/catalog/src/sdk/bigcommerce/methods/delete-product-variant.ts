import makeBigCommerceRepository, { BigCommerceRepository } from '../repository'
import { DeleteProductVariantInput } from '../repository/product-variant/delete'

export type DeleteProductVariantFn = (
  input: DeleteProductVariantInput,
) => Promise<void>

interface Client {
  bigCommerceRepository: BigCommerceRepository
}

export const makeDeleteProductVariantFn = (
  { bigCommerceRepository }: Client = {
    bigCommerceRepository: makeBigCommerceRepository(),
  },
): DeleteProductVariantFn => {
  return async input => {
    await bigCommerceRepository.deleteProductVariant(input)
  }
}
