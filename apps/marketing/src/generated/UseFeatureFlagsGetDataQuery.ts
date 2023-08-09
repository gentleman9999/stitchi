/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UseFeatureFlagsGetDataQuery
// ====================================================

export interface UseFeatureFlagsGetDataQuery_viewer_flags {
  __typename: "MembershipFlags";
  isBetaTester: boolean;
}

export interface UseFeatureFlagsGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  flags: UseFeatureFlagsGetDataQuery_viewer_flags;
}

export interface UseFeatureFlagsGetDataQuery {
  viewer: UseFeatureFlagsGetDataQuery_viewer | null;
}
