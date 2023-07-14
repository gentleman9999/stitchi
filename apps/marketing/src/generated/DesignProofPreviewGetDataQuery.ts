/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignProofPreviewGetDataQuery
// ====================================================

export interface DesignProofPreviewGetDataQuery_designProof_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface DesignProofPreviewGetDataQuery_designProof_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DesignProofPreviewGetDataQuery_designProof {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  artist: DesignProofPreviewGetDataQuery_designProof_artist | null;
  primaryImageFile: DesignProofPreviewGetDataQuery_designProof_primaryImageFile | null;
}

export interface DesignProofPreviewGetDataQuery {
  designProof: DesignProofPreviewGetDataQuery_designProof | null;
}

export interface DesignProofPreviewGetDataQueryVariables {
  designProofId: string;
}
