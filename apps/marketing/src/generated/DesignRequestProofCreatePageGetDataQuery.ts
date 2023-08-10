/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignRequestProofCreatePageGetDataQuery
// ====================================================

export interface DesignRequestProofCreatePageGetDataQuery_designRequest_designRequestProduct_colors {
  __typename: "DesignRequestProductColors";
  name: string | null;
  hexCode: string | null;
  catalogProductColorId: string;
}

export interface DesignRequestProofCreatePageGetDataQuery_designRequest_designRequestProduct {
  __typename: "DesignRequestProduct";
  id: string;
  colors: DesignRequestProofCreatePageGetDataQuery_designRequest_designRequestProduct_colors[];
}

export interface DesignRequestProofCreatePageGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  fileUploadDirectory: string;
  designRequestProduct: DesignRequestProofCreatePageGetDataQuery_designRequest_designRequestProduct;
}

export interface DesignRequestProofCreatePageGetDataQuery {
  designRequest: DesignRequestProofCreatePageGetDataQuery_designRequest | null;
}

export interface DesignRequestProofCreatePageGetDataQueryVariables {
  designId: string;
}
