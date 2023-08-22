/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipRole } from "./globalTypes";

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
  role: MembershipRole | null;
  user: ClosetSettingsTeamPageMembershipFragment_user | null;
}
