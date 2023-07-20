/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetDesignFiltersGetDataQuery
// ====================================================

export interface ClosetDesignFiltersGetDataQuery_viewer_organization_memberships_user {
  __typename: "User";
  id: string;
  name: string | null;
  picture: string | null;
}

export interface ClosetDesignFiltersGetDataQuery_viewer_organization_memberships {
  __typename: "Membership";
  id: string;
  user: ClosetDesignFiltersGetDataQuery_viewer_organization_memberships_user | null;
}

export interface ClosetDesignFiltersGetDataQuery_viewer_organization {
  __typename: "Organization";
  id: string;
  memberships: ClosetDesignFiltersGetDataQuery_viewer_organization_memberships[];
}

export interface ClosetDesignFiltersGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  organization: ClosetDesignFiltersGetDataQuery_viewer_organization;
}

export interface ClosetDesignFiltersGetDataQuery {
  viewer: ClosetDesignFiltersGetDataQuery_viewer | null;
}
