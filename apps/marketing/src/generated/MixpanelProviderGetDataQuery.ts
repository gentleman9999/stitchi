/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MixpanelProviderGetDataQuery
// ====================================================

export interface MixpanelProviderGetDataQuery_viewer_user {
  __typename: "User";
  id: string;
  email: string | null;
}

export interface MixpanelProviderGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  user: MixpanelProviderGetDataQuery_viewer_user | null;
}

export interface MixpanelProviderGetDataQuery {
  viewer: MixpanelProviderGetDataQuery_viewer | null;
}
