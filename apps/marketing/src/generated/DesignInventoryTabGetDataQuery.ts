/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignInventoryTabGetDataQuery
// ====================================================

export interface DesignInventoryTabGetDataQuery_designProduct_sizes {
  __typename: "DesignProductSize";
  id: string;
  name: string;
}

export interface DesignInventoryTabGetDataQuery_designProduct_colors {
  __typename: "DesignProductColor";
  id: string;
  name: string | null;
  hex: string | null;
}

export interface DesignInventoryTabGetDataQuery_designProduct {
  __typename: "DesignProduct";
  id: string;
  sizes: DesignInventoryTabGetDataQuery_designProduct_sizes[] | null;
  colors: DesignInventoryTabGetDataQuery_designProduct_colors[];
}

export interface DesignInventoryTabGetDataQuery {
  designProduct: DesignInventoryTabGetDataQuery_designProduct | null;
}

export interface DesignInventoryTabGetDataQueryVariables {
  designProductId: string;
}
