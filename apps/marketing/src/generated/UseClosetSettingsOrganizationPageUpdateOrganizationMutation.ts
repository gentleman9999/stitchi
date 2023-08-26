/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseClosetSettingsOrganizationPageUpdateOrganizationMutation
// ====================================================

export interface UseClosetSettingsOrganizationPageUpdateOrganizationMutation_organizationUpdate_organization {
  __typename: "Organization";
  id: string;
}

export interface UseClosetSettingsOrganizationPageUpdateOrganizationMutation_organizationUpdate {
  __typename: "OrganizationUpdatePayload";
  organization: UseClosetSettingsOrganizationPageUpdateOrganizationMutation_organizationUpdate_organization | null;
}

export interface UseClosetSettingsOrganizationPageUpdateOrganizationMutation {
  organizationUpdate: UseClosetSettingsOrganizationPageUpdateOrganizationMutation_organizationUpdate | null;
}

export interface UseClosetSettingsOrganizationPageUpdateOrganizationMutationVariables {
  input: OrganizationUpdateInput;
}
