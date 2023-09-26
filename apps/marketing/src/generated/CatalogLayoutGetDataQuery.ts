/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CatalogLayoutGetDataQuery
// ====================================================

export interface CatalogLayoutGetDataQuery_viewer_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface CatalogLayoutGetDataQuery_viewer_user {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
  picture: string | null;
}

export interface CatalogLayoutGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  humanizedRole: string | null;
  organization: CatalogLayoutGetDataQuery_viewer_organization;
  user: CatalogLayoutGetDataQuery_viewer_user | null;
}

export interface CatalogLayoutGetDataQuery {
  viewer: CatalogLayoutGetDataQuery_viewer | null;
}
