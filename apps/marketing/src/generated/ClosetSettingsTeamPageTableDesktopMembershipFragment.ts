/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClosetSettingsTeamPageTableDesktopMembershipFragment
// ====================================================

export interface ClosetSettingsTeamPageTableDesktopMembershipFragment_user {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
}

export interface ClosetSettingsTeamPageTableDesktopMembershipFragment {
  __typename: "Membership";
  id: string;
  createdAt: any;
  humanizedRole: string | null;
  user: ClosetSettingsTeamPageTableDesktopMembershipFragment_user | null;
}