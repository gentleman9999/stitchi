/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetSettingsOrganizatoinPageGetDataQuery
// ====================================================

export interface ClosetSettingsOrganizatoinPageGetDataQuery_viewer_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface ClosetSettingsOrganizatoinPageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  organization: ClosetSettingsOrganizatoinPageGetDataQuery_viewer_organization;
}

export interface ClosetSettingsOrganizatoinPageGetDataQuery {
  viewer: ClosetSettingsOrganizatoinPageGetDataQuery_viewer | null;
}
