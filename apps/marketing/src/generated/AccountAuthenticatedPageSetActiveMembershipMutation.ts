/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserSetOrganizationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AccountAuthenticatedPageSetActiveMembershipMutation
// ====================================================

export interface AccountAuthenticatedPageSetActiveMembershipMutation_userSetOrganization {
  __typename: "UserSetOrganizationPayload";
  membershipId: string | null;
}

export interface AccountAuthenticatedPageSetActiveMembershipMutation {
  userSetOrganization: AccountAuthenticatedPageSetActiveMembershipMutation_userSetOrganization | null;
}

export interface AccountAuthenticatedPageSetActiveMembershipMutationVariables {
  input: UserSetOrganizationInput;
}
