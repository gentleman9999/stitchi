/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationBrandFileCreateBatchInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseClosetBrandIndexPageCreateFilesMutation
// ====================================================

export interface UseClosetBrandIndexPageCreateFilesMutation_organizationBrandFileCreateBatch_brand {
  __typename: "OrganizationBrand";
  id: string;
}

export interface UseClosetBrandIndexPageCreateFilesMutation_organizationBrandFileCreateBatch {
  __typename: "OrganizationBrandFileCreateBatchPayload";
  brand: UseClosetBrandIndexPageCreateFilesMutation_organizationBrandFileCreateBatch_brand | null;
}

export interface UseClosetBrandIndexPageCreateFilesMutation {
  organizationBrandFileCreateBatch: UseClosetBrandIndexPageCreateFilesMutation_organizationBrandFileCreateBatch | null;
}

export interface UseClosetBrandIndexPageCreateFilesMutationVariables {
  input: OrganizationBrandFileCreateBatchInput;
}
