/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IntercomProviderGetDataQuery
// ====================================================

export interface IntercomProviderGetDataQuery_viewer_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface IntercomProviderGetDataQuery_viewer_user {
  __typename: "User";
  id: string;
  email: string | null;
  name: string | null;
}

export interface IntercomProviderGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  organization: IntercomProviderGetDataQuery_viewer_organization;
  user: IntercomProviderGetDataQuery_viewer_user | null;
}

export interface IntercomProviderGetDataQuery {
  viewer: IntercomProviderGetDataQuery_viewer | null;
}
