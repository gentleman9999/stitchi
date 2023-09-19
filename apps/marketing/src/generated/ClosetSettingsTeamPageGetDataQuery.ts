/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetSettingsTeamPageGetDataQuery
// ====================================================

export interface ClosetSettingsTeamPageGetDataQuery_viewer_organization_memberships_user {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
}

export interface ClosetSettingsTeamPageGetDataQuery_viewer_organization_memberships {
  __typename: "Membership";
  id: string;
  createdAt: any;
  humanizedRole: string | null;
  user: ClosetSettingsTeamPageGetDataQuery_viewer_organization_memberships_user | null;
  invitedEmail: string | null;
}

export interface ClosetSettingsTeamPageGetDataQuery_viewer_organization {
  __typename: "Organization";
  id: string;
  memberships: ClosetSettingsTeamPageGetDataQuery_viewer_organization_memberships[];
}

export interface ClosetSettingsTeamPageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  organization: ClosetSettingsTeamPageGetDataQuery_viewer_organization;
}

export interface ClosetSettingsTeamPageGetDataQuery {
  viewer: ClosetSettingsTeamPageGetDataQuery_viewer | null;
}
