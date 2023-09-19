/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserSetOrganizationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AcceptMembershipPageSetActiveMembershipMutation
// ====================================================

export interface AcceptMembershipPageSetActiveMembershipMutation_userSetOrganization {
  __typename: "UserSetOrganizationPayload";
  organizationId: string | null;
}

export interface AcceptMembershipPageSetActiveMembershipMutation {
  userSetOrganization: AcceptMembershipPageSetActiveMembershipMutation_userSetOrganization | null;
}

export interface AcceptMembershipPageSetActiveMembershipMutationVariables {
  input: UserSetOrganizationInput;
}
