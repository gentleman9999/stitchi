/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetDesignShowPageGetDataQuery
// ====================================================

export interface ClosetDesignShowPageGetDataQuery_designProduct {
  __typename: "DesignProduct";
  id: string;
  name: string;
}

export interface ClosetDesignShowPageGetDataQuery {
  designProduct: ClosetDesignShowPageGetDataQuery_designProduct | null;
}

export interface ClosetDesignShowPageGetDataQueryVariables {
  designId: string;
}
