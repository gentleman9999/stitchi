/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignRequestOverviewProductListDesignRequestProductFragment
// ====================================================

export interface DesignRequestOverviewProductListDesignRequestProductFragment_primaryImage {
  __typename: 'CatalogProductImage'
  url: string
}

export interface DesignRequestOverviewProductListDesignRequestProductFragment_brand {
  __typename: 'CatalogBrand'
  id: string
  name: string
  slug: string
}

export interface DesignRequestOverviewProductListDesignRequestProductFragment {
  __typename: 'CatalogProduct'
  id: string
  name: string
  slug: string
  primaryImage: DesignRequestOverviewProductListDesignRequestProductFragment_primaryImage | null
  brand: DesignRequestOverviewProductListDesignRequestProductFragment_brand | null
}
