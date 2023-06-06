/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderConfirmInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseConfirmOrderConfirmOrderMutation
// ====================================================

export interface UseConfirmOrderConfirmOrderMutation_orderConfirm_order {
  __typename: "Order";
  id: string;
}

export interface UseConfirmOrderConfirmOrderMutation_orderConfirm {
  __typename: "OrderConfirmPayload";
  order: UseConfirmOrderConfirmOrderMutation_orderConfirm_order | null;
}

export interface UseConfirmOrderConfirmOrderMutation {
  /**
   * Confirms an order with a customers details
   */
  orderConfirm: UseConfirmOrderConfirmOrderMutation_orderConfirm | null;
}

export interface UseConfirmOrderConfirmOrderMutationVariables {
  input: OrderConfirmInput;
}
