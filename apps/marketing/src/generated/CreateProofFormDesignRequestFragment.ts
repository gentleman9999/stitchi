/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CreateProofFormDesignRequestFragment
// ====================================================

export interface CreateProofFormDesignRequestFragment_designRequestProduct_colors {
  __typename: "DesignRequestProductColors";
  name: string | null;
  hexCode: string | null;
  catalogProductColorId: string;
}

export interface CreateProofFormDesignRequestFragment_designRequestProduct {
  __typename: "DesignRequestProduct";
  id: string;
  colors: CreateProofFormDesignRequestFragment_designRequestProduct_colors[];
}

export interface CreateProofFormDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  designRequestProduct: CreateProofFormDesignRequestFragment_designRequestProduct;
}
