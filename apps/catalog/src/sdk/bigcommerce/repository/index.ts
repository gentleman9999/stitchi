import makeClient, { BigCommerceClient } from '../client'
import makeDeleteProductCustomFieldFn, {
  DeleteProductCustomFieldFn,
} from './product-custom-field/delete'
import makeCreateProductImageFn, {
  CreateProductImageFn,
} from './product-image/create'
import makeDeleteProductImageFn, {
  DeleteProductImageFn,
} from './product-image/delete'
import makeListProductImagesFn, {
  ListProductImagesFn,
} from './product-image/list'
import makeBatchCreateProductMetadataFn, {
  BatchCreateProductMetadataFn,
} from './product-metadata/batch-create'
import makeBatchUpdateProductMetadataFn, {
  BatchUpdateProductMetadataFn,
} from './product-metadata/batch-update'
import makeListProductMetadataFn, {
  ListProductMetadataFn,
} from './product-metadata/list'
import makeUpdateProductVariantImageFn, {
  UpdateProductVariantImageFn,
} from './product-variant-image/update'
import makeBatchUpdateProductVariantsFn, {
  BatchUpdateProductVariantsFn,
} from './product-variant/batch-update'
import makeDeleteProductVariantFn, {
  DeleteProductVariantFn,
} from './product-variant/delete'
import makeCreateProductFn, { CreateProductFn } from './product/create'
import makeDeleteProductsFn, { DeleteProductsFn } from './product/delete'
import makeGetProductFn, { GetProductFn } from './product/get'
import makeUpdateProductFn, { UpdateProductFn } from './product/update'

export interface BigCommerceRepository {
  getProduct: GetProductFn
  createProduct: CreateProductFn
  updateProduct: UpdateProductFn
  deleteProduct: DeleteProductsFn

  createProductImage: CreateProductImageFn
  deletedProductImage: DeleteProductImageFn
  listProductImages: ListProductImagesFn

  listProductMetadata: ListProductMetadataFn
  batchCreateProductMetadata: BatchCreateProductMetadataFn
  batchUpdateProductMetadata: BatchUpdateProductMetadataFn

  updateProductVariantImage: UpdateProductVariantImageFn

  batchUpdateProductVariants: BatchUpdateProductVariantsFn
  deleteProductVariant: DeleteProductVariantFn

  deleteProductCustomField: DeleteProductCustomFieldFn
}

interface Config {
  client: BigCommerceClient
}

const makeBigCommerceRepository = (
  { client }: Config = {
    client: makeClient(),
  },
): BigCommerceRepository => {
  return {
    getProduct: makeGetProductFn({ client }),
    createProduct: makeCreateProductFn({ client }),
    updateProduct: makeUpdateProductFn({ client }),
    deleteProduct: makeDeleteProductsFn({ client }),

    createProductImage: makeCreateProductImageFn({ client }),
    deletedProductImage: makeDeleteProductImageFn({ client }),
    listProductImages: makeListProductImagesFn({ client }),

    listProductMetadata: makeListProductMetadataFn({ client }),
    batchCreateProductMetadata: makeBatchCreateProductMetadataFn({ client }),
    batchUpdateProductMetadata: makeBatchUpdateProductMetadataFn({ client }),

    updateProductVariantImage: makeUpdateProductVariantImageFn({ client }),

    batchUpdateProductVariants: makeBatchUpdateProductVariantsFn({ client }),
    deleteProductVariant: makeDeleteProductVariantFn({ client }),

    deleteProductCustomField: makeDeleteProductCustomFieldFn({ client }),
  }
}

export default makeBigCommerceRepository
