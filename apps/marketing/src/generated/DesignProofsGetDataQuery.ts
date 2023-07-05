/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: DesignProofsGetDataQuery
// ====================================================

export interface DesignProofsGetDataQuery_designRequest_proofs_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignProofsGetDataQuery_designRequest_proofs_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignProofsGetDataQuery_designRequest_proofs_files = DesignProofsGetDataQuery_designRequest_proofs_files_FileUnknown | DesignProofsGetDataQuery_designRequest_proofs_files_FileImage;

export interface DesignProofsGetDataQuery_designRequest_proofs_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignProofsGetDataQuery_designRequest_proofs {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  note: string | null;
  files: DesignProofsGetDataQuery_designRequest_proofs_files[];
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
