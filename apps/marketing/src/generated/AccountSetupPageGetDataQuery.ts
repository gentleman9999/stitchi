/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountSetupPageGetDataQuery
// ====================================================

export interface AccountSetupPageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
}

export interface AccountSetupPageGetDataQuery_userMemberships {
  __typename: "Membership";
  id: string;
  organizationId: string;
}

export interface AccountSetupPageGetDataQuery {
  viewer: AccountSetupPageGetDataQuery_viewer | null;
  userMemberships: AccountSetupPageGetDataQuery_userMemberships[];
}
