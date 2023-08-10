/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserOrganizationCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: OrganizationCreateDialogCreateOrganizationMutation
// ====================================================

export interface OrganizationCreateDialogCreateOrganizationMutation_userOrganizationCreate_organization {
  __typename: "Organization";
  id: string;
}

export interface OrganizationCreateDialogCreateOrganizationMutation_userOrganizationCreate_membership {
  __typename: "Membership";
  id: string;
}

export interface OrganizationCreateDialogCreateOrganizationMutation_userOrganizationCreate {
  __typename: "UserOrganizationCreatePayload";
  organization: OrganizationCreateDialogCreateOrganizationMutation_userOrganizationCreate_organization | null;
  membership: OrganizationCreateDialogCreateOrganizationMutation_userOrganizationCreate_membership | null;
}

export interface OrganizationCreateDialogCreateOrganizationMutation {
  userOrganizationCreate: OrganizationCreateDialogCreateOrganizationMutation_userOrganizationCreate | null;
}

export interface OrganizationCreateDialogCreateOrganizationMutationVariables {
  input: UserOrganizationCreateInput;
}
