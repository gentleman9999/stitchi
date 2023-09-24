/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetDashboardPageGetDataQuery
// ====================================================

export interface ClosetDashboardPageGetDataQuery_viewer_user {
  __typename: "User";
  id: string;
  name: string | null;
}

export interface ClosetDashboardPageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  user: ClosetDashboardPageGetDataQuery_viewer_user | null;
}

export interface ClosetDashboardPageGetDataQuery {
  viewer: ClosetDashboardPageGetDataQuery_viewer | null;
}
