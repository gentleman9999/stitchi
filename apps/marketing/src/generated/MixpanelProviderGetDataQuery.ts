/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MixpanelProviderGetDataQuery
// ====================================================

export interface MixpanelProviderGetDataQuery_viewer_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface MixpanelProviderGetDataQuery_viewer_user {
  __typename: "User";
  createdAt: any | null;
  id: string;
  intercomUserHash: string | null;
  email: string | null;
  name: string | null;
  phoneNumber: string | null;
  picture: string | null;
}

export interface MixpanelProviderGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  organization: MixpanelProviderGetDataQuery_viewer_organization;
  user: MixpanelProviderGetDataQuery_viewer_user | null;
}

export interface MixpanelProviderGetDataQuery {
  viewer: MixpanelProviderGetDataQuery_viewer | null;
}
