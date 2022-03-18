/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductShowPageGetProductQuery
// ====================================================

export interface ProductShowPageGetProductQuery_catalog_product_manufacturer {
  __typename: "Manufacturer";
  id: string;
  name: string;
}

export interface ProductShowPageGetProductQuery_catalog_product_vendor {
  __typename: "Vendor";
  id: string;
  name: string;
}

export interface ProductShowPageGetProductQuery_catalog_product_primaryImage {
  __typename: "ImageUrl";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ProductShowPageGetProductQuery_catalog_product {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  manufacturer: ProductShowPageGetProductQuery_catalog_product_manufacturer | null;
  vendor: ProductShowPageGetProductQuery_catalog_product_vendor | null;
  primaryImage: ProductShowPageGetProductQuery_catalog_product_primaryImage | null;
}

export interface ProductShowPageGetProductQuery_catalog {
  __typename: "Catalog";
  product: ProductShowPageGetProductQuery_catalog_product | null;
}

export interface ProductShowPageGetProductQuery {
  catalog: ProductShowPageGetProductQuery_catalog | null;
}

export interface ProductShowPageGetProductQueryVariables {
  id: string;
}
