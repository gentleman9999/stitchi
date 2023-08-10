/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignRequestAssociatedProductsGetDataQuery
// ====================================================

export interface DesignRequestAssociatedProductsGetDataQuery_designRequest_designProducts_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DesignRequestAssociatedProductsGetDataQuery_designRequest_designProducts {
  __typename: "DesignProduct";
  id: string;
  name: string;
  primaryImageFile: DesignRequestAssociatedProductsGetDataQuery_designRequest_designProducts_primaryImageFile | null;
}

export interface DesignRequestAssociatedProductsGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  designProducts: DesignRequestAssociatedProductsGetDataQuery_designRequest_designProducts[];
}

export interface DesignRequestAssociatedProductsGetDataQuery {
  designRequest: DesignRequestAssociatedProductsGetDataQuery_designRequest | null;
}

export interface DesignRequestAssociatedProductsGetDataQueryVariables {
  designRequestId: string;
}
