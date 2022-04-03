/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MaterialCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseCreateProductHookCreateMaterialtMutation
// ====================================================

export interface UseCreateProductHookCreateMaterialtMutation_materialCreate_material {
  __typename: "Material";
  id: string;
}

export interface UseCreateProductHookCreateMaterialtMutation_materialCreate {
  __typename: "MaterialCreatePayload";
  material: UseCreateProductHookCreateMaterialtMutation_materialCreate_material;
}

export interface UseCreateProductHookCreateMaterialtMutation {
  /**
   * Creates a new product
   */
  materialCreate: UseCreateProductHookCreateMaterialtMutation_materialCreate | null;
}

export interface UseCreateProductHookCreateMaterialtMutationVariables {
  input: MaterialCreateInput;
}
