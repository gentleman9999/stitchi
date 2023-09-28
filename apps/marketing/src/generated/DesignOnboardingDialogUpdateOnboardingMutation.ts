/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserOnboardingUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DesignOnboardingDialogUpdateOnboardingMutation
// ====================================================

export interface DesignOnboardingDialogUpdateOnboardingMutation_userOnboardingUpdate_userOnboarding {
  __typename: "UserOnboarding";
  id: string;
}

export interface DesignOnboardingDialogUpdateOnboardingMutation_userOnboardingUpdate {
  __typename: "UserOnboardingUpdatePayload";
  userOnboarding: DesignOnboardingDialogUpdateOnboardingMutation_userOnboardingUpdate_userOnboarding | null;
}

export interface DesignOnboardingDialogUpdateOnboardingMutation {
  userOnboardingUpdate: DesignOnboardingDialogUpdateOnboardingMutation_userOnboardingUpdate | null;
}

export interface DesignOnboardingDialogUpdateOnboardingMutationVariables {
  input: UserOnboardingUpdateInput;
}
