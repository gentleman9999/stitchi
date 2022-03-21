/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductShowPageGetProductQuery
// ====================================================

export interface ProductShowPageGetProductQuery_catalog_product_sizes {
  __typename: "Size";
  id: string;
  name: string | null;
  value: string;
}

export interface ProductShowPageGetProductQuery_catalog_product_colors {
  __typename: "Color";
  id: string;
  hex: string | null;
  name: string | null;
}

export interface ProductShowPageGetProductQuery_catalog_product_manufacturer {
  __typename: "Manufacturer";
  id: string;
  name: string;
  slug: string;
}

export interface ProductShowPageGetProductQuery_catalog_product_vendor {
  __typename: "Vendor";
  id: string;
  name: string;
}

export interface ProductShowPageGetProductQuery_catalog_product_categories_breadcrumbs {
  __typename: "Category";
  id: string;
  name: string;
}

export interface ProductShowPageGetProductQuery_catalog_product_categories {
  __typename: "Category";
  id: string;
  breadcrumbs: ProductShowPageGetProductQuery_catalog_product_categories_breadcrumbs[] | null;
}

export interface ProductShowPageGetProductQuery_catalog_product_variants_color {
  __typename: "Color";
  id: string;
  name: string | null;
  hex: string | null;
}

export interface ProductShowPageGetProductQuery_catalog_product_variants {
  __typename: "MaterialVariant";
  id: string;
  color: ProductShowPageGetProductQuery_catalog_product_variants_color | null;
}

export interface ProductShowPageGetProductQuery_catalog_product_image {
  __typename: "Image";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ProductShowPageGetProductQuery_catalog_product {
  __typename: "Material";
  id: string;
  name: string;
  style: string;
  sizes: ProductShowPageGetProductQuery_catalog_product_sizes[] | null;
  colors: ProductShowPageGetProductQuery_catalog_product_colors[] | null;
  manufacturer: ProductShowPageGetProductQuery_catalog_product_manufacturer | null;
  vendor: ProductShowPageGetProductQuery_catalog_product_vendor | null;
  categories: ProductShowPageGetProductQuery_catalog_product_categories[] | null;
  variants: ProductShowPageGetProductQuery_catalog_product_variants[] | null;
  image: ProductShowPageGetProductQuery_catalog_product_image | null;
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
