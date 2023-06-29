/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignRequestOverviewProductListDesignRequestProductFragment
// ====================================================

export interface DesignRequestOverviewProductListDesignRequestProductFragment_colors {
  __typename: "DesignRequestProductColors";
  hexCode: string | null;
  name: string | null;
}

export interface DesignRequestOverviewProductListDesignRequestProductFragment_catalogProduct_primaryImage {
  __typename: "CatalogProductImage";
  url: string;
}

export interface DesignRequestOverviewProductListDesignRequestProductFragment_catalogProduct_brand {
  __typename: "CatalogBrand";
  id: string;
  name: string;
  slug: string;
}

export interface DesignRequestOverviewProductListDesignRequestProductFragment_catalogProduct {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  slug: string;
  primaryImage: DesignRequestOverviewProductListDesignRequestProductFragment_catalogProduct_primaryImage | null;
  brand: DesignRequestOverviewProductListDesignRequestProductFragment_catalogProduct_brand | null;
}

export interface DesignRequestOverviewProductListDesignRequestProductFragment {
  __typename: "DesignRequestProduct";
  id: string;
  colors: DesignRequestOverviewProductListDesignRequestProductFragment_colors[];
  catalogProduct: DesignRequestOverviewProductListDesignRequestProductFragment_catalogProduct | null;
}
