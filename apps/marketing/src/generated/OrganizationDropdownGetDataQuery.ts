/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrganizationDropdownGetDataQuery
// ====================================================

export interface OrganizationDropdownGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
}

export interface OrganizationDropdownGetDataQuery_userMemberships_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface OrganizationDropdownGetDataQuery_userMemberships {
  __typename: "Membership";
  id: string;
  humanizedRole: string | null;
  organization: OrganizationDropdownGetDataQuery_userMemberships_organization;
}

export interface OrganizationDropdownGetDataQuery {
  viewer: OrganizationDropdownGetDataQuery_viewer | null;
  userMemberships: OrganizationDropdownGetDataQuery_userMemberships[];
}
