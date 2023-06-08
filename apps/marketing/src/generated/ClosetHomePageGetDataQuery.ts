/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetHomePageGetDataQuery
// ====================================================

export interface ClosetHomePageGetDataQuery_viewer_user {
  __typename: "User";
  id: string | null;
  nickname: string | null;
}

export interface ClosetHomePageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  organizationId: string;
  userId: string;
  user: ClosetHomePageGetDataQuery_viewer_user | null;
}

export interface ClosetHomePageGetDataQuery {
  viewer: ClosetHomePageGetDataQuery_viewer | null;
}
