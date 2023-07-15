/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: DesignProofsListGetDataQuery
// ====================================================

export interface DesignProofsListGetDataQuery_designRequest_proofs_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DesignProofsListGetDataQuery_designRequest_proofs {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  primaryImageFile: DesignProofsListGetDataQuery_designRequest_proofs_primaryImageFile | null;
}

export interface DesignProofsListGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  status: DesignRequestStatus;
  proofs: DesignProofsListGetDataQuery_designRequest_proofs[];
}

export interface DesignProofsListGetDataQuery {
  designRequest: DesignProofsListGetDataQuery_designRequest | null;
}

export interface DesignProofsListGetDataQueryVariables {
  designRequestId: string;
}
