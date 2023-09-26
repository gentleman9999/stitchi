/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AppTopbarUserMembershipFragment
// ====================================================

export interface AppTopbarUserMembershipFragment_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface AppTopbarUserMembershipFragment_user {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
  picture: string | null;
}

export interface AppTopbarUserMembershipFragment {
  __typename: "Membership";
  id: string;
  humanizedRole: string | null;
  organization: AppTopbarUserMembershipFragment_organization;
  user: AppTopbarUserMembershipFragment_user | null;
}
