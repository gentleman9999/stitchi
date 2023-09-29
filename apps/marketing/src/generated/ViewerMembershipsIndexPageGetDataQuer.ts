/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerMembershipsIndexPageGetDataQuer
// ====================================================

export interface ViewerMembershipsIndexPageGetDataQuer_userMemberships_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface ViewerMembershipsIndexPageGetDataQuer_userMemberships {
  __typename: "Membership";
  id: string;
  humanizedRole: string | null;
  organization: ViewerMembershipsIndexPageGetDataQuer_userMemberships_organization;
}

export interface ViewerMembershipsIndexPageGetDataQuer {
  userMemberships: ViewerMembershipsIndexPageGetDataQuer_userMemberships[];
}
