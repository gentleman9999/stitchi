/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestSubmitInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseDesignRequestActionsSubmitDesignRequestMutation
// ====================================================

export interface UseDesignRequestActionsSubmitDesignRequestMutation_designRequestSubmit_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UseDesignRequestActionsSubmitDesignRequestMutation_designRequestSubmit {
  __typename: "DesignRequestSubmitPayload";
  designRequest: UseDesignRequestActionsSubmitDesignRequestMutation_designRequestSubmit_designRequest | null;
}

export interface UseDesignRequestActionsSubmitDesignRequestMutation {
  designRequestSubmit: UseDesignRequestActionsSubmitDesignRequestMutation_designRequestSubmit | null;
}

export interface UseDesignRequestActionsSubmitDesignRequestMutationVariables {
  input: DesignRequestSubmitInput;
}
