/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetDesignShowPageGetDataQuery
// ====================================================

export interface ClosetDesignShowPageGetDataQuery_design {
  __typename: "Design";
  id: string;
  name: string;
  description: string | null;
}

export interface ClosetDesignShowPageGetDataQuery {
  design: ClosetDesignShowPageGetDataQuery_design | null;
}

export interface ClosetDesignShowPageGetDataQueryVariables {
  designId: string;
}
