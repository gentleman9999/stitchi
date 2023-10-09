/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AccountSetupPageBootstrapAccount
// ====================================================

export interface AccountSetupPageBootstrapAccount_userBoostrap_memberships {
  __typename: "Membership";
  id: string;
  organizationId: string;
}

export interface AccountSetupPageBootstrapAccount_userBoostrap {
  __typename: "User";
  id: string;
  memberships: AccountSetupPageBootstrapAccount_userBoostrap_memberships[];
}

export interface AccountSetupPageBootstrapAccount {
  /**
   * Bootstraps a new user with necessary resources
   */
  userBoostrap: AccountSetupPageBootstrapAccount_userBoostrap | null;
}
