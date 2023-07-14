/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProofVariantInputDesignRequestFragment
// ====================================================

export interface ProofVariantInputDesignRequestFragment_designRequestProduct_colors {
  __typename: "DesignRequestProductColors";
  name: string | null;
  hexCode: string | null;
  catalogProductColorId: string;
}

export interface ProofVariantInputDesignRequestFragment_designRequestProduct {
  __typename: "DesignRequestProduct";
  id: string;
  colors: ProofVariantInputDesignRequestFragment_designRequestProduct_colors[];
}

export interface ProofVariantInputDesignRequestFragment {
  __typename: "DesignRequest";
  designRequestProduct: ProofVariantInputDesignRequestFragment_designRequestProduct;
}
