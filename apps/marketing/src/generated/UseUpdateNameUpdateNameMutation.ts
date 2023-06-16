/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseUpdateNameUpdateNameMutation
// ====================================================

export interface UseUpdateNameUpdateNameMutation_designRequestUpdate_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UseUpdateNameUpdateNameMutation_designRequestUpdate {
  __typename: "DesignRequestUpdatePayload";
  designRequest: UseUpdateNameUpdateNameMutation_designRequestUpdate_designRequest | null;
}

export interface UseUpdateNameUpdateNameMutation {
  designRequestUpdate: UseUpdateNameUpdateNameMutation_designRequestUpdate | null;
}

export interface UseUpdateNameUpdateNameMutationVariables {
  input: DesignRequestUpdateInput;
}
