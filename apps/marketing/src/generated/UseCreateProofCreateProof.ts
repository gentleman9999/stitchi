/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestProofCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseCreateProofCreateProof
// ====================================================

export interface UseCreateProofCreateProof_designRequestProofCreate_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UseCreateProofCreateProof_designRequestProofCreate {
  __typename: "DesignRequestProofCreatePayload";
  designRequest: UseCreateProofCreateProof_designRequestProofCreate_designRequest | null;
}

export interface UseCreateProofCreateProof {
  designRequestProofCreate: UseCreateProofCreateProof_designRequestProofCreate | null;
}

export interface UseCreateProofCreateProofVariables {
  input: DesignRequestProofCreateInput;
}
