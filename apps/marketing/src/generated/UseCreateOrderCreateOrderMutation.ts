/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderCartCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseCreateOrderCreateOrderMutation
// ====================================================

export interface UseCreateOrderCreateOrderMutation_orderCartCreate_order {
  __typename: "Order";
  id: string;
}

export interface UseCreateOrderCreateOrderMutation_orderCartCreate {
  __typename: "OrderCartCreatePayload";
  order: UseCreateOrderCreateOrderMutation_orderCartCreate_order | null;
}

export interface UseCreateOrderCreateOrderMutation {
  /**
   * Creates a new order during user Cart
   */
  orderCartCreate: UseCreateOrderCreateOrderMutation_orderCartCreate | null;
}

export interface UseCreateOrderCreateOrderMutationVariables {
  input: OrderCartCreateInput;
}
