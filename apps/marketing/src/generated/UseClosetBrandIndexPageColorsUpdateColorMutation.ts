/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationBrandColorUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseClosetBrandIndexPageColorsUpdateColorMutation
// ====================================================

export interface UseClosetBrandIndexPageColorsUpdateColorMutation_organizationBrandColorUpdate_brand {
  __typename: "OrganizationBrand";
  id: string;
}

export interface UseClosetBrandIndexPageColorsUpdateColorMutation_organizationBrandColorUpdate {
  __typename: "OrganizationBrandColorUpdatePayload";
  brand: UseClosetBrandIndexPageColorsUpdateColorMutation_organizationBrandColorUpdate_brand | null;
}

export interface UseClosetBrandIndexPageColorsUpdateColorMutation {
  organizationBrandColorUpdate: UseClosetBrandIndexPageColorsUpdateColorMutation_organizationBrandColorUpdate | null;
}

export interface UseClosetBrandIndexPageColorsUpdateColorMutationVariables {
  input: OrganizationBrandColorUpdateInput;
}
