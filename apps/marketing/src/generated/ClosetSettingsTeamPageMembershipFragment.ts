/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClosetSettingsTeamPageMembershipFragment
// ====================================================

export interface ClosetSettingsTeamPageMembershipFragment_user {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
}

export interface ClosetSettingsTeamPageMembershipFragment {
  __typename: "Membership";
  id: string;
  createdAt: any;
  humanizedRole: string | null;
  user: ClosetSettingsTeamPageMembershipFragment_user | null;
  invitedEmail: string | null;
}
