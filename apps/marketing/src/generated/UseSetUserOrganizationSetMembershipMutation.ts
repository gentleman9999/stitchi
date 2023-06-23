/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserSetOrganizationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseSetUserOrganizationSetMembershipMutation
// ====================================================

export interface UseSetUserOrganizationSetMembershipMutation_userSetOrganization {
  __typename: "UserSetOrganizationPayload";
  membershipId: string | null;
}

export interface UseSetUserOrganizationSetMembershipMutation {
  userSetOrganization: UseSetUserOrganizationSetMembershipMutation_userSetOrganization | null;
}

export interface UseSetUserOrganizationSetMembershipMutationVariables {
  input: UserSetOrganizationInput;
}
