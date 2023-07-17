/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignProductCreateOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseCreateOrderCreateOrderMutation
// ====================================================

export interface UseCreateOrderCreateOrderMutation_designProductCreateOrder_order {
  __typename: "Order";
  id: string;
}

export interface UseCreateOrderCreateOrderMutation_designProductCreateOrder {
  __typename: "DesignProductCreateOrderPayload";
  order: UseCreateOrderCreateOrderMutation_designProductCreateOrder_order | null;
}

export interface UseCreateOrderCreateOrderMutation {
  designProductCreateOrder: UseCreateOrderCreateOrderMutation_designProductCreateOrder | null;
}

export interface UseCreateOrderCreateOrderMutationVariables {
  input: DesignProductCreateOrderInput;
}
