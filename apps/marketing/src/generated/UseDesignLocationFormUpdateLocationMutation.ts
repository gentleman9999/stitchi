/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestDesignLocationUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseDesignLocationFormUpdateLocationMutation
// ====================================================

export interface UseDesignLocationFormUpdateLocationMutation_designRequestDesignLocationUpdate_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UseDesignLocationFormUpdateLocationMutation_designRequestDesignLocationUpdate {
  __typename: "DesignRequestDesignLocationUpdatePayload";
  designRequest: UseDesignLocationFormUpdateLocationMutation_designRequestDesignLocationUpdate_designRequest | null;
}

export interface UseDesignLocationFormUpdateLocationMutation {
  designRequestDesignLocationUpdate: UseDesignLocationFormUpdateLocationMutation_designRequestDesignLocationUpdate | null;
}

export interface UseDesignLocationFormUpdateLocationMutationVariables {
  input: DesignRequestDesignLocationUpdateInput;
}
