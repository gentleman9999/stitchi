/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SizeCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SizeCreateMutation
// ====================================================

export interface SizeCreateMutation_sizeCreate_size {
  __typename: "Size";
  id: string;
  catalogId: string;
}

export interface SizeCreateMutation_sizeCreate {
  __typename: "SizeCreatePayload";
  size: SizeCreateMutation_sizeCreate_size;
}

export interface SizeCreateMutation {
  /**
   * Creates a new size
   */
  sizeCreate: SizeCreateMutation_sizeCreate | null;
}

export interface SizeCreateMutationVariables {
  input: SizeCreateInput;
}
