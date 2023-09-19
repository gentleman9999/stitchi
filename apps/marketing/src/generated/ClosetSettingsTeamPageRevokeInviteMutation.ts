/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipInviteRevokeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ClosetSettingsTeamPageRevokeInviteMutation
// ====================================================

export interface ClosetSettingsTeamPageRevokeInviteMutation_membershipInviteRevoke_membership {
  __typename: "Membership";
  id: string;
}

export interface ClosetSettingsTeamPageRevokeInviteMutation_membershipInviteRevoke {
  __typename: "MembershipInviteRevokePayload";
  membership: ClosetSettingsTeamPageRevokeInviteMutation_membershipInviteRevoke_membership;
}

export interface ClosetSettingsTeamPageRevokeInviteMutation {
  membershipInviteRevoke: ClosetSettingsTeamPageRevokeInviteMutation_membershipInviteRevoke | null;
}

export interface ClosetSettingsTeamPageRevokeInviteMutationVariables {
  input: MembershipInviteRevokeInput;
}
