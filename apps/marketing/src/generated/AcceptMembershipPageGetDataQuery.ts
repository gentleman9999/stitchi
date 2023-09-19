/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AcceptMembershipPageGetDataQuery
// ====================================================

export interface AcceptMembershipPageGetDataQuery_membershipInvite {
  __typename: "MembershipInvite";
  id: string;
  membershipId: string;
  invitedEmail: string | null;
  organizationName: string | null;
}

export interface AcceptMembershipPageGetDataQuery {
  membershipInvite: AcceptMembershipPageGetDataQuery_membershipInvite;
}

export interface AcceptMembershipPageGetDataQueryVariables {
  membershipId: string;
}
