/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetDesignRequestShowPageGetViewerDataQuery
// ====================================================

export interface ClosetDesignRequestShowPageGetViewerDataQuery_viewer_user_onboarding {
  __typename: "UserOnboarding";
  id: string;
  seenDesignRequestDraftOnboarding: boolean | null;
}

export interface ClosetDesignRequestShowPageGetViewerDataQuery_viewer_user {
  __typename: "User";
  id: string;
  onboarding: ClosetDesignRequestShowPageGetViewerDataQuery_viewer_user_onboarding | null;
}

export interface ClosetDesignRequestShowPageGetViewerDataQuery_viewer {
  __typename: "Membership";
  id: string;
  user: ClosetDesignRequestShowPageGetViewerDataQuery_viewer_user | null;
}

export interface ClosetDesignRequestShowPageGetViewerDataQuery {
  viewer: ClosetDesignRequestShowPageGetViewerDataQuery_viewer | null;
}
