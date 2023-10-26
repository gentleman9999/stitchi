/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserOnboardingUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseUserOnboardingUpdateOnboardingMutation
// ====================================================

export interface UseUserOnboardingUpdateOnboardingMutation_userOnboardingUpdate_userOnboarding {
  __typename: "UserOnboarding";
  id: string;
}

export interface UseUserOnboardingUpdateOnboardingMutation_userOnboardingUpdate {
  __typename: "UserOnboardingUpdatePayload";
  userOnboarding: UseUserOnboardingUpdateOnboardingMutation_userOnboardingUpdate_userOnboarding | null;
}

export interface UseUserOnboardingUpdateOnboardingMutation {
  userOnboardingUpdate: UseUserOnboardingUpdateOnboardingMutation_userOnboardingUpdate | null;
}

export interface UseUserOnboardingUpdateOnboardingMutationVariables {
  input: UserOnboardingUpdateInput;
}
