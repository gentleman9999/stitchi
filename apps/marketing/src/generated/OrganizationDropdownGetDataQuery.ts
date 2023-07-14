/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrganizationDropdownGetDataQuery
// ====================================================

export interface OrganizationDropdownGetDataQuery_userMemberships_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface OrganizationDropdownGetDataQuery_userMemberships {
  __typename: "Membership";
  id: string;
  organization: OrganizationDropdownGetDataQuery_userMemberships_organization | null;
}

export interface OrganizationDropdownGetDataQuery {
  userMemberships: OrganizationDropdownGetDataQuery_userMemberships[];
}
