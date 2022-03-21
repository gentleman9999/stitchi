/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductDetailsProductFragment
// ====================================================

export interface ProductDetailsProductFragment_sizes {
  __typename: "Size";
  id: string;
  name: string | null;
  value: string;
}

export interface ProductDetailsProductFragment_colors {
  __typename: "Color";
  id: string;
  hex: string | null;
  name: string | null;
}

export interface ProductDetailsProductFragment_manufacturer {
  __typename: "Manufacturer";
  id: string;
  name: string;
  slug: string;
}

export interface ProductDetailsProductFragment_vendor {
  __typename: "Vendor";
  id: string;
  name: string;
}

export interface ProductDetailsProductFragment_categories_breadcrumbs {
  __typename: "Category";
  id: string;
  name: string;
}

export interface ProductDetailsProductFragment_categories {
  __typename: "Category";
  id: string;
  breadcrumbs: ProductDetailsProductFragment_categories_breadcrumbs[] | null;
}

export interface ProductDetailsProductFragment {
  __typename: "Material";
  id: string;
  name: string;
  style: string;
  sizes: ProductDetailsProductFragment_sizes[] | null;
  colors: ProductDetailsProductFragment_colors[] | null;
  manufacturer: ProductDetailsProductFragment_manufacturer | null;
  vendor: ProductDetailsProductFragment_vendor | null;
  categories: ProductDetailsProductFragment_categories[] | null;
}
