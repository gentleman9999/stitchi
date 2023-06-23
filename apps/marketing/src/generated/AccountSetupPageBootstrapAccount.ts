/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AccountSetupPageBootstrapAccount
// ====================================================

export interface AccountSetupPageBootstrapAccount_userBoostrap_organizations {
  __typename: "Organization";
  id: string;
}

export interface AccountSetupPageBootstrapAccount_userBoostrap {
  __typename: "User";
  id: string | null;
  organizations: AccountSetupPageBootstrapAccount_userBoostrap_organizations[];
}

export interface AccountSetupPageBootstrapAccount {
  /**
   * Bootstraps a new user with necessary resources
   */
  userBoostrap: AccountSetupPageBootstrapAccount_userBoostrap | null;
}
