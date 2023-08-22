/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipRole } from "./globalTypes";

// ====================================================
// GraphQL fragment: ClosetSettingsTeamPageTableMobileMemberFragment
// ====================================================

export interface ClosetSettingsTeamPageTableMobileMemberFragment_user {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
}

export interface ClosetSettingsTeamPageTableMobileMemberFragment {
  __typename: "Membership";
  id: string;
  createdAt: any;
  role: MembershipRole | null;
  user: ClosetSettingsTeamPageTableMobileMemberFragment_user | null;
}
