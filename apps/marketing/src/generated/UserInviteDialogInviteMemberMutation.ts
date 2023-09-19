/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipInviteInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UserInviteDialogInviteMemberMutation
// ====================================================

export interface UserInviteDialogInviteMemberMutation_membershipInvite_memberships {
  __typename: "Membership";
  id: string;
  organizationId: string;
}

export interface UserInviteDialogInviteMemberMutation_membershipInvite {
  __typename: "MembershipInvitePayload";
  memberships: UserInviteDialogInviteMemberMutation_membershipInvite_memberships[];
}

export interface UserInviteDialogInviteMemberMutation {
  membershipInvite: UserInviteDialogInviteMemberMutation_membershipInvite | null;
}

export interface UserInviteDialogInviteMemberMutationVariables {
  input: MembershipInviteInput;
}
