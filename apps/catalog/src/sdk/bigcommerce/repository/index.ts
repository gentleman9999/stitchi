import makeClient, { BigCommerceClient } from "../client";
import makeCreateProductImageFn, {
  CreateProductImageFn,
} from "./product-image/create";
import makeDeleteProductImageFn, {
  DeleteProductImageFn,
} from "./product-image/delete";
import makeListProductImagesFn, {
  ListProductImagesFn,
} from "./product-image/list";
import makeBatchCreateProductMetadataFn, {
  BatchCreateProductMetadataFn,
} from "./product-metadata/batch-create";
import makeBatchUpdateProductMetadataFn, {
  BatchUpdateProductMetadataFn,
} from "./product-metadata/batch-update";
import makeListProductMetadataFn, {
  ListProductMetadataFn,
} from "./product-metadata/list";
import makeUpdateProductVariantImageFn, {
  UpdateProductVariantImageFn,
} from "./product-variant-image/update";
import makeBatchUpdateProductVariantsFn, {
  BatchUpdateProductVariantsFn,
} from "./product-variant/batch-update";
import makeCreateProductFn, { CreateProductFn } from "./product/create";
import makeGetProductFn, { GetProductFn } from "./product/get";
import makeUpdateProductFn, { UpdateProductFn } from "./product/update";

export interface BigCommerceRepository {
  getProduct: GetProductFn;
  createProduct: CreateProductFn;
  updateProduct: UpdateProductFn;

  createProductImage: CreateProductImageFn;
  deletedProductImage: DeleteProductImageFn;
  listProductImages: ListProductImagesFn;

  listProductMetadata: ListProductMetadataFn;
  batchCreateProductMetadata: BatchCreateProductMetadataFn;
  batchUpdateProductMetadata: BatchUpdateProductMetadataFn;

  updateProductVariantImage: UpdateProductVariantImageFn;

  batchUpdateProductVariants: BatchUpdateProductVariantsFn;
}

interface Config {
  client: BigCommerceClient;
}

const makeBigCommerceRepository = (
  { client }: Config = {
    client: makeClient(),
  }
): BigCommerceRepository => {
  return {
    getProduct: makeGetProductFn({ client }),
    createProduct: makeCreateProductFn({ client }),
    updateProduct: makeUpdateProductFn({ client }),

    createProductImage: makeCreateProductImageFn({ client }),
    deletedProductImage: makeDeleteProductImageFn({ client }),
    listProductImages: makeListProductImagesFn({ client }),

    listProductMetadata: makeListProductMetadataFn({ client }),
    batchCreateProductMetadata: makeBatchCreateProductMetadataFn({ client }),
    batchUpdateProductMetadata: makeBatchUpdateProductMetadataFn({ client }),

    updateProductVariantImage: makeUpdateProductVariantImageFn({ client }),

    batchUpdateProductVariants: makeBatchUpdateProductVariantsFn({ client }),
  };
};

export default makeBigCommerceRepository;
