/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserOrganizationIndexPageGetDataQuery
// ====================================================

export interface UserOrganizationIndexPageGetDataQuery_viewer_user_organizations {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface UserOrganizationIndexPageGetDataQuery_viewer_user {
  __typename: "User";
  organizations: UserOrganizationIndexPageGetDataQuery_viewer_user_organizations[];
}

export interface UserOrganizationIndexPageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  user: UserOrganizationIndexPageGetDataQuery_viewer_user | null;
}

export interface UserOrganizationIndexPageGetDataQuery {
  viewer: UserOrganizationIndexPageGetDataQuery_viewer | null;
}
