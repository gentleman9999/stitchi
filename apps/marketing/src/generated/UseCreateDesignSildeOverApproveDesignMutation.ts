/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestApproveInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseCreateDesignSildeOverApproveDesignMutation
// ====================================================

export interface UseCreateDesignSildeOverApproveDesignMutation_designRequestApprove_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UseCreateDesignSildeOverApproveDesignMutation_designRequestApprove_design {
  __typename: "Design";
  id: string;
}

export interface UseCreateDesignSildeOverApproveDesignMutation_designRequestApprove {
  __typename: "DesignRequestApprovePayload";
  designRequest: UseCreateDesignSildeOverApproveDesignMutation_designRequestApprove_designRequest | null;
  design: UseCreateDesignSildeOverApproveDesignMutation_designRequestApprove_design | null;
}

export interface UseCreateDesignSildeOverApproveDesignMutation {
  designRequestApprove: UseCreateDesignSildeOverApproveDesignMutation_designRequestApprove | null;
}

export interface UseCreateDesignSildeOverApproveDesignMutationVariables {
  input: DesignRequestApproveInput;
}
