/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PrimarySideBarMembershipFragment
// ====================================================

export interface PrimarySideBarMembershipFragment_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface PrimarySideBarMembershipFragment_user {
  __typename: "User";
  id: string;
  name: string | null;
  picture: string | null;
  email: string | null;
}

export interface PrimarySideBarMembershipFragment {
  __typename: "Membership";
  id: string;
  unseenWebNotificationsCount: number;
  organization: PrimarySideBarMembershipFragment_organization;
  user: PrimarySideBarMembershipFragment_user | null;
}
