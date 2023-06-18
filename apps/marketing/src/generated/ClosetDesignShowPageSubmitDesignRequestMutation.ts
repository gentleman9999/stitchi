/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestSubmitInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ClosetDesignShowPageSubmitDesignRequestMutation
// ====================================================

export interface ClosetDesignShowPageSubmitDesignRequestMutation_designRequestSubmit_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface ClosetDesignShowPageSubmitDesignRequestMutation_designRequestSubmit {
  __typename: "DesignRequestSubmitPayload";
  designRequest: ClosetDesignShowPageSubmitDesignRequestMutation_designRequestSubmit_designRequest | null;
}

export interface ClosetDesignShowPageSubmitDesignRequestMutation {
  designRequestSubmit: ClosetDesignShowPageSubmitDesignRequestMutation_designRequestSubmit | null;
}

export interface ClosetDesignShowPageSubmitDesignRequestMutationVariables {
  input: DesignRequestSubmitInput;
}
