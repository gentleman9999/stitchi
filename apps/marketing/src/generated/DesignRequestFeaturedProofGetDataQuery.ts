/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignRequestFeaturedProofGetDataQuery
// ====================================================

export interface DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs_primaryImageFile {
  __typename: "FileImage";
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

export interface DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs {
  __typename: "DesignProof";
  id: string;
  primaryImageFile: DesignRequestFeaturedProofGetDataQuery_designRequest_latestProofs_primaryImageFile | null;
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
