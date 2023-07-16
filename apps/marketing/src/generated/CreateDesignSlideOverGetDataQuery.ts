/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CreateDesignSlideOverGetDataQuery
// ====================================================

export interface CreateDesignSlideOverGetDataQuery_designProof_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface CreateDesignSlideOverGetDataQuery_designProof {
  __typename: "DesignProof";
  id: string;
  primaryImageFile: CreateDesignSlideOverGetDataQuery_designProof_primaryImageFile | null;
}

export interface CreateDesignSlideOverGetDataQuery {
  designProof: CreateDesignSlideOverGetDataQuery_designProof | null;
}

export interface CreateDesignSlideOverGetDataQueryVariables {
  designProofId: string;
}
