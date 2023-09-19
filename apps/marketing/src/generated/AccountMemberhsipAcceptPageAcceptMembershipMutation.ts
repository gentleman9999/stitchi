/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipInviteAcceptInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AccountMemberhsipAcceptPageAcceptMembershipMutation
// ====================================================

export interface AccountMemberhsipAcceptPageAcceptMembershipMutation_membershipInviteAccept_membership {
  __typename: "Membership";
  id: string;
}

export interface AccountMemberhsipAcceptPageAcceptMembershipMutation_membershipInviteAccept {
  __typename: "MembershipInviteAcceptPayload";
  membership: AccountMemberhsipAcceptPageAcceptMembershipMutation_membershipInviteAccept_membership;
}

export interface AccountMemberhsipAcceptPageAcceptMembershipMutation {
  membershipInviteAccept: AccountMemberhsipAcceptPageAcceptMembershipMutation_membershipInviteAccept | null;
}

export interface AccountMemberhsipAcceptPageAcceptMembershipMutationVariables {
  input: MembershipInviteAcceptInput;
}
