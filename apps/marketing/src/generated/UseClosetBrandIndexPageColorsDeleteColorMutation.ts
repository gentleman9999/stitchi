/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationBrandColorDeleteInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseClosetBrandIndexPageColorsDeleteColorMutation
// ====================================================

export interface UseClosetBrandIndexPageColorsDeleteColorMutation_organizationBrandColorDelete_brand {
  __typename: "OrganizationBrand";
  id: string;
}

export interface UseClosetBrandIndexPageColorsDeleteColorMutation_organizationBrandColorDelete {
  __typename: "OrganizationBrandColorDeletePayload";
  brand: UseClosetBrandIndexPageColorsDeleteColorMutation_organizationBrandColorDelete_brand | null;
}

export interface UseClosetBrandIndexPageColorsDeleteColorMutation {
  organizationBrandColorDelete: UseClosetBrandIndexPageColorsDeleteColorMutation_organizationBrandColorDelete | null;
}

export interface UseClosetBrandIndexPageColorsDeleteColorMutationVariables {
  input: OrganizationBrandColorDeleteInput;
}
