/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignRequestProofCreatePageGetDataQuery
// ====================================================

export interface DesignRequestProofCreatePageGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  fileUploadDirectory: string;
}

export interface DesignRequestProofCreatePageGetDataQuery {
  designRequest: DesignRequestProofCreatePageGetDataQuery_designRequest | null;
}

export interface DesignRequestProofCreatePageGetDataQueryVariables {
  designId: string;
}
