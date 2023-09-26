/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountSetupPageGetDataQuery
// ====================================================

export interface AccountSetupPageGetDataQuery_viewer_user_memberships {
  __typename: "Membership";
  id: string;
}

export interface AccountSetupPageGetDataQuery_viewer_user {
  __typename: "User";
  id: string;
  memberships: AccountSetupPageGetDataQuery_viewer_user_memberships[];
}

export interface AccountSetupPageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  user: AccountSetupPageGetDataQuery_viewer_user | null;
}

export interface AccountSetupPageGetDataQuery {
  viewer: AccountSetupPageGetDataQuery_viewer | null;
}
