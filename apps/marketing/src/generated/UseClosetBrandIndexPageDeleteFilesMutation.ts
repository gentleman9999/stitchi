/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationBrandFileDeleteBatchInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseClosetBrandIndexPageDeleteFilesMutation
// ====================================================

export interface UseClosetBrandIndexPageDeleteFilesMutation_organizationBrandFileDeleteBatch_brand {
  __typename: "OrganizationBrand";
  id: string;
}

export interface UseClosetBrandIndexPageDeleteFilesMutation_organizationBrandFileDeleteBatch {
  __typename: "OrganizationBrandFileDeleteBatchPayload";
  brand: UseClosetBrandIndexPageDeleteFilesMutation_organizationBrandFileDeleteBatch_brand | null;
}

export interface UseClosetBrandIndexPageDeleteFilesMutation {
  organizationBrandFileDeleteBatch: UseClosetBrandIndexPageDeleteFilesMutation_organizationBrandFileDeleteBatch | null;
}

export interface UseClosetBrandIndexPageDeleteFilesMutationVariables {
  input: OrganizationBrandFileDeleteBatchInput;
}
