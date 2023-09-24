/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestAssignInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UnclaimedDesignRequestsCardAssignDesignMutation
// ====================================================

export interface UnclaimedDesignRequestsCardAssignDesignMutation_designRequestAssign_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UnclaimedDesignRequestsCardAssignDesignMutation_designRequestAssign {
  __typename: "DesignRequestAssignPayload";
  designRequest: UnclaimedDesignRequestsCardAssignDesignMutation_designRequestAssign_designRequest | null;
}

export interface UnclaimedDesignRequestsCardAssignDesignMutation {
  designRequestAssign: UnclaimedDesignRequestsCardAssignDesignMutation_designRequestAssign | null;
}

export interface UnclaimedDesignRequestsCardAssignDesignMutationVariables {
  input: DesignRequestAssignInput;
}
