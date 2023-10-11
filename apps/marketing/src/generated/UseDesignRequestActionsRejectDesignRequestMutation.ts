/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestRejectInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseDesignRequestActionsRejectDesignRequestMutation
// ====================================================

export interface UseDesignRequestActionsRejectDesignRequestMutation_designRequestReject_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UseDesignRequestActionsRejectDesignRequestMutation_designRequestReject {
  __typename: "DesignRequestRejectPayload";
  designRequest: UseDesignRequestActionsRejectDesignRequestMutation_designRequestReject_designRequest | null;
}

export interface UseDesignRequestActionsRejectDesignRequestMutation {
  designRequestReject: UseDesignRequestActionsRejectDesignRequestMutation_designRequestReject | null;
}

export interface UseDesignRequestActionsRejectDesignRequestMutationVariables {
  input: DesignRequestRejectInput;
}
