/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetSettingsGeneralPageGetDataQuery
// ====================================================

export interface ClosetSettingsGeneralPageGetDataQuery_viewer_user {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
  picture: string | null;
}

export interface ClosetSettingsGeneralPageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  user: ClosetSettingsGeneralPageGetDataQuery_viewer_user | null;
}

export interface ClosetSettingsGeneralPageGetDataQuery {
  viewer: ClosetSettingsGeneralPageGetDataQuery_viewer | null;
}
