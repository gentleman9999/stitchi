/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AccountAuthenticatedPageAssignAnonymousResourcesMutation
// ====================================================

export interface AccountAuthenticatedPageAssignAnonymousResourcesMutation_membershipConnectAnonymousResources_membership {
  __typename: "Membership";
  id: string;
}

export interface AccountAuthenticatedPageAssignAnonymousResourcesMutation_membershipConnectAnonymousResources {
  __typename: "MembershipConnectAnonymousResourcesPayload";
  membership: AccountAuthenticatedPageAssignAnonymousResourcesMutation_membershipConnectAnonymousResources_membership;
}

export interface AccountAuthenticatedPageAssignAnonymousResourcesMutation {
  membershipConnectAnonymousResources: AccountAuthenticatedPageAssignAnonymousResourcesMutation_membershipConnectAnonymousResources | null;
}
