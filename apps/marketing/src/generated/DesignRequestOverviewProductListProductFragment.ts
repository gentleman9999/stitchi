/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignRequestOverviewProductListProductFragment
// ====================================================

export interface DesignRequestOverviewProductListProductFragment_catalogProduct {
  __typename: "CatalogProduct";
  id: string;
}

export interface DesignRequestOverviewProductListProductFragment {
  __typename: "DesignRequestProduct";
  id: string;
  catalogProduct: DesignRequestOverviewProductListProductFragment_catalogProduct | null;
}
