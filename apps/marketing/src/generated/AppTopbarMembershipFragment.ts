/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AppTopbarMembershipFragment
// ====================================================

export interface AppTopbarMembershipFragment_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface AppTopbarMembershipFragment_user {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
  picture: string | null;
}

export interface AppTopbarMembershipFragment {
  __typename: "Membership";
  id: string;
  humanizedRole: string | null;
  organization: AppTopbarMembershipFragment_organization;
  user: AppTopbarMembershipFragment_user | null;
}
