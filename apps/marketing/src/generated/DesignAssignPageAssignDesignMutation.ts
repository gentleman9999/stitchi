/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestAssignInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DesignAssignPageAssignDesignMutation
// ====================================================

export interface DesignAssignPageAssignDesignMutation_designRequestAssign_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface DesignAssignPageAssignDesignMutation_designRequestAssign {
  __typename: "DesignRequestAssignPayload";
  designRequest: DesignAssignPageAssignDesignMutation_designRequestAssign_designRequest | null;
}

export interface DesignAssignPageAssignDesignMutation {
  designRequestAssign: DesignAssignPageAssignDesignMutation_designRequestAssign | null;
}

export interface DesignAssignPageAssignDesignMutationVariables {
  input: DesignRequestAssignInput;
}
