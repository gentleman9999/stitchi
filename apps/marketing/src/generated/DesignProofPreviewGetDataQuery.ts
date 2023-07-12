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

export interface DesignProofPreviewGetDataQuery_designProof_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignProofPreviewGetDataQuery_designProof_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignProofPreviewGetDataQuery_designProof_files = DesignProofPreviewGetDataQuery_designProof_files_FileUnknown | DesignProofPreviewGetDataQuery_designProof_files_FileImage;

export interface DesignProofPreviewGetDataQuery_designProof {
  __typename: "DesignProof";
  id: string;
  note: string | null;
  createdAt: any;
  artist: DesignProofPreviewGetDataQuery_designProof_artist | null;
  files: DesignProofPreviewGetDataQuery_designProof_files[];
}

export interface DesignProofPreviewGetDataQuery {
  designProof: DesignProofPreviewGetDataQuery_designProof | null;
}

export interface DesignProofPreviewGetDataQueryVariables {
  designProofId: string;
}
