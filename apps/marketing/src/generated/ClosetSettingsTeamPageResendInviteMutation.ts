/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipInviteResendInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ClosetSettingsTeamPageResendInviteMutation
// ====================================================

export interface ClosetSettingsTeamPageResendInviteMutation_membershipInviteResend_membership {
  __typename: "Membership";
  id: string;
}

export interface ClosetSettingsTeamPageResendInviteMutation_membershipInviteResend {
  __typename: "MembershipInviteResendPayload";
  membership: ClosetSettingsTeamPageResendInviteMutation_membershipInviteResend_membership;
}

export interface ClosetSettingsTeamPageResendInviteMutation {
  membershipInviteResend: ClosetSettingsTeamPageResendInviteMutation_membershipInviteResend | null;
}

export interface ClosetSettingsTeamPageResendInviteMutationVariables {
  input: MembershipInviteResendInput;
}
