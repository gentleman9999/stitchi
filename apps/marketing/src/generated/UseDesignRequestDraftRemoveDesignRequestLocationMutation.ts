/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestDesignLocationDeleteInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseDesignRequestDraftRemoveDesignRequestLocationMutation
// ====================================================

export interface UseDesignRequestDraftRemoveDesignRequestLocationMutation_designRequestDesignLocationDelete_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UseDesignRequestDraftRemoveDesignRequestLocationMutation_designRequestDesignLocationDelete {
  __typename: "DesignRequestDesignLocationDeletePayload";
  designRequest: UseDesignRequestDraftRemoveDesignRequestLocationMutation_designRequestDesignLocationDelete_designRequest | null;
}

export interface UseDesignRequestDraftRemoveDesignRequestLocationMutation {
  designRequestDesignLocationDelete: UseDesignRequestDraftRemoveDesignRequestLocationMutation_designRequestDesignLocationDelete | null;
}

export interface UseDesignRequestDraftRemoveDesignRequestLocationMutationVariables {
  input: DesignRequestDesignLocationDeleteInput;
}
