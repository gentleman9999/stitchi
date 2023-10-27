/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetInventoryShowPageGetDataQuery
// ====================================================

export interface ClosetInventoryShowPageGetDataQuery_designProduct {
  __typename: "DesignProduct";
  id: string;
  designRequestId: string;
  name: string;
}

export interface ClosetInventoryShowPageGetDataQuery {
  designProduct: ClosetInventoryShowPageGetDataQuery_designProduct | null;
}

export interface ClosetInventoryShowPageGetDataQueryVariables {
  designId: string;
}
