/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CatalogProductCustomizeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseCustomizeProductCustomizeMutation
// ====================================================

export interface UseCustomizeProductCustomizeMutation_catalogProductCustomize_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UseCustomizeProductCustomizeMutation_catalogProductCustomize_order {
  __typename: "Order";
  id: string;
}

export interface UseCustomizeProductCustomizeMutation_catalogProductCustomize {
  __typename: "CatalogProductCustomizePayload";
  designRequest: UseCustomizeProductCustomizeMutation_catalogProductCustomize_designRequest | null;
  order: UseCustomizeProductCustomizeMutation_catalogProductCustomize_order | null;
}

export interface UseCustomizeProductCustomizeMutation {
  catalogProductCustomize: UseCustomizeProductCustomizeMutation_catalogProductCustomize | null;
}

export interface UseCustomizeProductCustomizeMutationVariables {
  input: CatalogProductCustomizeInput;
}
