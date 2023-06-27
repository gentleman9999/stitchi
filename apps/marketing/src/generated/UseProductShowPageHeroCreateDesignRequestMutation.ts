/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseProductShowPageHeroCreateDesignRequestMutation
// ====================================================

export interface UseProductShowPageHeroCreateDesignRequestMutation_designRequestCreate_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UseProductShowPageHeroCreateDesignRequestMutation_designRequestCreate {
  __typename: "DesignRequestCreatePayload";
  designRequest: UseProductShowPageHeroCreateDesignRequestMutation_designRequestCreate_designRequest | null;
}

export interface UseProductShowPageHeroCreateDesignRequestMutation {
  designRequestCreate: UseProductShowPageHeroCreateDesignRequestMutation_designRequestCreate | null;
}

export interface UseProductShowPageHeroCreateDesignRequestMutationVariables {
  input: DesignRequestCreateInput;
}
