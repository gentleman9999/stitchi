/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestRevisionRequestCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseDesignRequestMessageInputSubmitRevisionRequestMutation
// ====================================================

export interface UseDesignRequestMessageInputSubmitRevisionRequestMutation_designRequestRevisionRequestCreate_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UseDesignRequestMessageInputSubmitRevisionRequestMutation_designRequestRevisionRequestCreate {
  __typename: "DesignRequestRevisionRequestCreatePayload";
  designRequest: UseDesignRequestMessageInputSubmitRevisionRequestMutation_designRequestRevisionRequestCreate_designRequest | null;
}

export interface UseDesignRequestMessageInputSubmitRevisionRequestMutation {
  designRequestRevisionRequestCreate: UseDesignRequestMessageInputSubmitRevisionRequestMutation_designRequestRevisionRequestCreate | null;
}

export interface UseDesignRequestMessageInputSubmitRevisionRequestMutationVariables {
  input: DesignRequestRevisionRequestCreateInput;
}
