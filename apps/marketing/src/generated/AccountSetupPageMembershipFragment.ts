/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AccountSetupPageMembershipFragment
// ====================================================

export interface AccountSetupPageMembershipFragment_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface AccountSetupPageMembershipFragment {
  __typename: "Membership";
  id: string;
  organization: AccountSetupPageMembershipFragment_organization | null;
}
