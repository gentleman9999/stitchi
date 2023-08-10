/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseDesignRequestDraftUpdateDesignRequestMutation
// ====================================================

export interface UseDesignRequestDraftUpdateDesignRequestMutation_designRequestUpdate_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UseDesignRequestDraftUpdateDesignRequestMutation_designRequestUpdate {
  __typename: "DesignRequestUpdatePayload";
  designRequest: UseDesignRequestDraftUpdateDesignRequestMutation_designRequestUpdate_designRequest | null;
}

export interface UseDesignRequestDraftUpdateDesignRequestMutation {
  designRequestUpdate: UseDesignRequestDraftUpdateDesignRequestMutation_designRequestUpdate | null;
}

export interface UseDesignRequestDraftUpdateDesignRequestMutationVariables {
  input: DesignRequestUpdateInput;
}
