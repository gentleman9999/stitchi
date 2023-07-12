/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignRequestFeaturedProofGetDataQuery
// ====================================================

export interface DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  name: string;
  url: string;
}

export interface DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs_files_FileImage {
  __typename: "FileImage";
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

export type DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs_files = DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs_files_FileUnknown | DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs_files_FileImage;

export interface DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs {
  __typename: "DesignProof";
  id: string;
  note: string | null;
  files: DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs_files[];
  artist: DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs_artist | null;
}

export interface DesignRequestFeaturedProofGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  latestProofs: DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs[];
}

export interface DesignRequestFeaturedProofGetDataQuery {
  designRequest: DesignRequestFeaturedProofGetDataQuery_designRequest | null;
}

export interface DesignRequestFeaturedProofGetDataQueryVariables {
  designRequestId: string;
}
