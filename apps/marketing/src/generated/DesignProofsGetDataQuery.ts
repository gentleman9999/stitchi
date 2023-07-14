/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: DesignProofsGetDataQuery
// ====================================================

export interface DesignProofsGetDataQuery_designRequest_proofs_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DesignProofsGetDataQuery_designRequest_proofs_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignProofsGetDataQuery_designRequest_proofs {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  primaryImageFile: DesignProofsGetDataQuery_designRequest_proofs_primaryImageFile | null;
  artist: DesignProofsGetDataQuery_designRequest_proofs_artist | null;
}

export interface DesignProofsGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  status: DesignRequestStatus;
  proofs: DesignProofsGetDataQuery_designRequest_proofs[];
}

export interface DesignProofsGetDataQuery {
  designRequest: DesignProofsGetDataQuery_designRequest | null;
}

export interface DesignProofsGetDataQueryVariables {
  designRequestId: string;
}
