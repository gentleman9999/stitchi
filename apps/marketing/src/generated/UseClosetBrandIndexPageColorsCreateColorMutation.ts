/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationBrandColorCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseClosetBrandIndexPageColorsCreateColorMutation
// ====================================================

export interface UseClosetBrandIndexPageColorsCreateColorMutation_organizationBrandColorCreate_brand {
  __typename: "OrganizationBrand";
  id: string;
}

export interface UseClosetBrandIndexPageColorsCreateColorMutation_organizationBrandColorCreate {
  __typename: "OrganizationBrandColorCreatePayload";
  brand: UseClosetBrandIndexPageColorsCreateColorMutation_organizationBrandColorCreate_brand | null;
}

export interface UseClosetBrandIndexPageColorsCreateColorMutation {
  organizationBrandColorCreate: UseClosetBrandIndexPageColorsCreateColorMutation_organizationBrandColorCreate | null;
}

export interface UseClosetBrandIndexPageColorsCreateColorMutationVariables {
  input: OrganizationBrandColorCreateInput;
}
