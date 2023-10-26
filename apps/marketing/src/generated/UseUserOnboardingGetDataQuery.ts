/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UseUserOnboardingGetDataQuery
// ====================================================

export interface UseUserOnboardingGetDataQuery_viewer_user_onboarding {
  __typename: "UserOnboarding";
  id: string;
  /**
   * Message we show first time a user sees a design request
   */
  seenDesignRequestDraftOnboarding: boolean | null;
  /**
   * Onboarding banner we show on the design hub / index page
   */
  seenDesignIndexPageOnboardingBanner: boolean | null;
  /**
   * Onboarding banner we show on the inventory hub / index page
   */
  seenInventoryIndexPageOnboardingBanner: boolean | null;
}

export interface UseUserOnboardingGetDataQuery_viewer_user {
  __typename: "User";
  id: string;
  onboarding: UseUserOnboardingGetDataQuery_viewer_user_onboarding | null;
}

export interface UseUserOnboardingGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  user: UseUserOnboardingGetDataQuery_viewer_user | null;
}

export interface UseUserOnboardingGetDataQuery {
  viewer: UseUserOnboardingGetDataQuery_viewer | null;
}
