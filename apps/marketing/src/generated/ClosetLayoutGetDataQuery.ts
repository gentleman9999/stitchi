/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetLayoutGetDataQuery
// ====================================================

export interface ClosetLayoutGetDataQuery_viewer_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface ClosetLayoutGetDataQuery_viewer_user {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
  picture: string | null;
}

export interface ClosetLayoutGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  humanizedRole: string | null;
  organization: ClosetLayoutGetDataQuery_viewer_organization;
  user: ClosetLayoutGetDataQuery_viewer_user | null;
  unseenWebNotificationsCount: number;
}

export interface ClosetLayoutGetDataQuery {
  viewer: ClosetLayoutGetDataQuery_viewer | null;
}
