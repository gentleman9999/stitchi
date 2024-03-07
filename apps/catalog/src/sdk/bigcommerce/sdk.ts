import makeBatchUpdateProductVariantsFn, {
  BatchUpdateProductVariantsFn,
} from "./methods/batch-update-product-variants";
import makeCreateCategoryFn, {
  CreateCategoryFn,
} from "./methods/create-category";
import makeCreateProductFn, { CreateProductFn } from "./methods/create-product";
import makeCreateProductOptionFn, {
  CreateProductOptionFn,
} from "./methods/create-product-option";
import makeGetProductFn, { GetProductFn } from "./methods/get-product";

import makeGetProductBySkuFn, {
  GetProductBySkuFn,
} from "./methods/get-product-by-sku";
import makeListBrandsFn, { ListBrandsFn } from "./methods/list-brands";
import makeListCategoriesFn, {
  ListCategoriesFn,
} from "./methods/list-categories";
import makeListProductImagesFn, {
  ListProductImagesFn,
} from "./methods/list-product-images";
import makeListProductOptionsFn, {
  ListProductOptionsFn,
} from "./methods/list-product-options";
import makeListProductVariantsFn, {
  ListProductVariantsFn,
} from "./methods/list-product-variants";
import makeListProductsFn, { ListProductsFn } from "./methods/list-products";
import makeListProductsMetadataFn, {
  ListProductsMetadataFn,
} from "./methods/list-products-metadata";
import { UpdateProductFn, makeUpdateProductFn } from "./methods/update-product";
import makeUpdateProductOptionFn, {
  UpdateProductOptionFn,
} from "./methods/update-product-option";
import makeUpdateProductVariantImageFn, {
  UpdateProductVariantImageFn,
} from "./repository/product-variant-image/update";

export interface BigCommerceSdk {
  getProduct: GetProductFn;
  getProductBySku: GetProductBySkuFn;

  createCategory: CreateCategoryFn;
  createProduct: CreateProductFn;
  createProductOption: CreateProductOptionFn;

  updateProduct: UpdateProductFn;
  updateProductOption: UpdateProductOptionFn;
  updateProductVariantImage: UpdateProductVariantImageFn;

  batchUpdateProductVariants: BatchUpdateProductVariantsFn;

  listBrands: ListBrandsFn;
  listCategories: ListCategoriesFn;
  listProducts: ListProductsFn;
  listProductVariants: ListProductVariantsFn;
  listProductOptions: ListProductOptionsFn;
  listProductImages: ListProductImagesFn;
  listProductsMetadata: ListProductsMetadataFn;
}

interface MakeSdkConfig {
  makeGetProduct: typeof makeGetProductFn;
  makeGetProductBySku: typeof makeGetProductBySkuFn;

  makeCreateCategory: typeof makeCreateCategoryFn;
  makeCreateProduct: typeof makeCreateProductFn;
  makeCreateProductOption: typeof makeCreateProductOptionFn;
  makeUpdateProductVariantImage: typeof makeUpdateProductVariantImageFn;

  makeUpdateProduct: typeof makeUpdateProductFn;
  makeUpdateProductOption: typeof makeUpdateProductOptionFn;

  makeBatchUpdateProductVariants: typeof makeBatchUpdateProductVariantsFn;

  makeListBrands: typeof makeListBrandsFn;
  makeListCategories: typeof makeListCategoriesFn;
  makeListProducts: typeof makeListProductsFn;
  makeListProductVariants: typeof makeListProductVariantsFn;
  makeListProductOptions: typeof makeListProductOptionsFn;
  makeListProductImages: typeof makeListProductImagesFn;
  makeListProductsMetadata: typeof makeListProductsMetadataFn;
}

const makeSdk = (
  {
    makeCreateCategory,
    makeListCategories,
    makeGetProduct,
    makeGetProductBySku,
    makeCreateProduct,
    makeUpdateProduct,
    makeBatchUpdateProductVariants,
    makeListProducts,
    makeListProductVariants,
    makeCreateProductOption,
    makeUpdateProductOption,
    makeListProductOptions,
    makeUpdateProductVariantImage,
    makeListProductsMetadata,
    makeListProductImages,
    makeListBrands,
  }: MakeSdkConfig = {
    makeCreateCategory: makeCreateCategoryFn,
    makeListCategories: makeListCategoriesFn,
    makeGetProduct: makeGetProductFn,
    makeGetProductBySku: makeGetProductBySkuFn,
    makeCreateProduct: makeCreateProductFn,
    makeUpdateProduct: makeUpdateProductFn,
    makeBatchUpdateProductVariants: makeBatchUpdateProductVariantsFn,
    makeListProducts: makeListProductsFn,
    makeListProductVariants: makeListProductVariantsFn,
    makeCreateProductOption: makeCreateProductOptionFn,
    makeUpdateProductOption: makeUpdateProductOptionFn,
    makeListProductOptions: makeListProductOptionsFn,
    makeUpdateProductVariantImage: makeUpdateProductVariantImageFn,
    makeListProductsMetadata: makeListProductsMetadataFn,
    makeListProductImages: makeListProductImagesFn,
    makeListBrands: makeListBrandsFn,
  }
): BigCommerceSdk => {
  return {
    getProduct: makeGetProduct(),
    getProductBySku: makeGetProductBySku(),

    createCategory: makeCreateCategory(),
    createProduct: makeCreateProduct(),
    createProductOption: makeCreateProductOption(),

    updateProduct: makeUpdateProduct(),
    updateProductOption: makeUpdateProductOption(),
    updateProductVariantImage: makeUpdateProductVariantImage(),

    batchUpdateProductVariants: makeBatchUpdateProductVariants(),

    listBrands: makeListBrands(),
    listCategories: makeListCategories(),
    listProductVariants: makeListProductVariants(),
    listProducts: makeListProducts(),
    listProductOptions: makeListProductOptions(),
    listProductImages: makeListProductImages(),
    listProductsMetadata: makeListProductsMetadata(),
  };
};

export default makeSdk;
