/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AppTopbarUserGetDataQuer
// ====================================================

export interface AppTopbarUserGetDataQuer_viewer_user {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
  picture: string | null;
}

export interface AppTopbarUserGetDataQuer_viewer {
  __typename: "Membership";
  id: string;
  user: AppTopbarUserGetDataQuer_viewer_user | null;
}

export interface AppTopbarUserGetDataQuer {
  viewer: AppTopbarUserGetDataQuer_viewer | null;
}
