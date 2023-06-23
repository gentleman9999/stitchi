/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountSetupPageGetDataQuery
// ====================================================

export interface AccountSetupPageGetDataQuery_userMemberships_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface AccountSetupPageGetDataQuery_userMemberships {
  __typename: "Membership";
  id: string;
  organization: AccountSetupPageGetDataQuery_userMemberships_organization | null;
}

export interface AccountSetupPageGetDataQuery {
  userMemberships: AccountSetupPageGetDataQuery_userMemberships[];
}
