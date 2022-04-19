/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ColorCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ColorCreateMutation
// ====================================================

export interface ColorCreateMutation_colorCreate_color {
  __typename: "Color";
  id: string;
  catalogId: string;
}

export interface ColorCreateMutation_colorCreate {
  __typename: "ColorCreatePayload";
  color: ColorCreateMutation_colorCreate_color;
}

export interface ColorCreateMutation {
  /**
   * Creates a new color
   */
  colorCreate: ColorCreateMutation_colorCreate | null;
}

export interface ColorCreateMutationVariables {
  input: ColorCreateInput;
}
