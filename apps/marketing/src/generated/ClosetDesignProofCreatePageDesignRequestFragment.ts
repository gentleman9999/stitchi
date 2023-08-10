/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClosetDesignProofCreatePageDesignRequestFragment
// ====================================================

export interface ClosetDesignProofCreatePageDesignRequestFragment_designRequestProduct_colors {
  __typename: "DesignRequestProductColors";
  name: string | null;
  hexCode: string | null;
  catalogProductColorId: string;
}

export interface ClosetDesignProofCreatePageDesignRequestFragment_designRequestProduct {
  __typename: "DesignRequestProduct";
  id: string;
  colors: ClosetDesignProofCreatePageDesignRequestFragment_designRequestProduct_colors[];
}

export interface ClosetDesignProofCreatePageDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  fileUploadDirectory: string;
  designRequestProduct: ClosetDesignProofCreatePageDesignRequestFragment_designRequestProduct;
}
