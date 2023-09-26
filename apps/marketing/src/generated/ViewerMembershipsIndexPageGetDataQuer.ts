/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerMembershipsIndexPageGetDataQuer
// ====================================================

export interface ViewerMembershipsIndexPageGetDataQuer_viewer_user_memberships_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface ViewerMembershipsIndexPageGetDataQuer_viewer_user_memberships {
  __typename: "Membership";
  id: string;
  humanizedRole: string | null;
  organization: ViewerMembershipsIndexPageGetDataQuer_viewer_user_memberships_organization;
}

export interface ViewerMembershipsIndexPageGetDataQuer_viewer_user {
  __typename: "User";
  id: string;
  memberships: ViewerMembershipsIndexPageGetDataQuer_viewer_user_memberships[];
}

export interface ViewerMembershipsIndexPageGetDataQuer_viewer {
  __typename: "Membership";
  id: string;
  user: ViewerMembershipsIndexPageGetDataQuer_viewer_user | null;
}

export interface ViewerMembershipsIndexPageGetDataQuer {
  viewer: ViewerMembershipsIndexPageGetDataQuer_viewer | null;
}
