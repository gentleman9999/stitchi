/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SideBarMembershipFragment
// ====================================================

export interface SideBarMembershipFragment_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface SideBarMembershipFragment_user {
  __typename: "User";
  id: string;
  name: string | null;
  picture: string | null;
  email: string | null;
}

export interface SideBarMembershipFragment {
  __typename: "Membership";
  id: string;
  unseenWebNotificationsCount: number;
  organization: SideBarMembershipFragment_organization;
  user: SideBarMembershipFragment_user | null;
}
