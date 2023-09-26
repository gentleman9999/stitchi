/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AppTopbarUserGetDataQuery
// ====================================================

export interface AppTopbarUserGetDataQuery_viewer_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface AppTopbarUserGetDataQuery_viewer_user {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
  picture: string | null;
}

export interface AppTopbarUserGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  humanizedRole: string | null;
  organization: AppTopbarUserGetDataQuery_viewer_organization;
  user: AppTopbarUserGetDataQuery_viewer_user | null;
}

export interface AppTopbarUserGetDataQuery {
  viewer: AppTopbarUserGetDataQuery_viewer | null;
}
