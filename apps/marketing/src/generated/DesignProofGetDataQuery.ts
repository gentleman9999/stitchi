/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: DesignProofGetDataQuery
// ====================================================

export interface DesignProofGetDataQuery_designRequest_proofs {
  __typename: "DesignProof";
  id: string;
}

export interface DesignProofGetDataQuery_designRequest_designRequestProduct_colors {
  __typename: "DesignRequestProductColors";
  catalogProductColorId: string;
  name: string | null;
  hexCode: string | null;
}

export interface DesignProofGetDataQuery_designRequest_designRequestProduct {
  __typename: "DesignRequestProduct";
  colors: DesignProofGetDataQuery_designRequest_designRequestProduct_colors[];
}

export interface DesignProofGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  status: DesignRequestStatus;
  proofs: DesignProofGetDataQuery_designRequest_proofs[];
  designRequestProduct: DesignProofGetDataQuery_designRequest_designRequestProduct;
}

export interface DesignProofGetDataQuery {
  designRequest: DesignProofGetDataQuery_designRequest | null;
}

export interface DesignProofGetDataQueryVariables {
  designRequestId: string;
}
