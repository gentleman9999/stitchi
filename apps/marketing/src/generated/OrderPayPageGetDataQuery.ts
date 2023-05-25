/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrderPayPageGetDataQuery
// ====================================================

export interface OrderPayPageGetDataQuery_order {
  __typename: "Order";
  id: string;
  totalAmountDueCents: number;
  totalTaxCents: number;
  totalPriceCents: number;
  totalShippingCents: number;
  subtotalPriceCents: number;
  totalProcessingFeeCents: number;
}

export interface OrderPayPageGetDataQuery {
  order: OrderPayPageGetDataQuery_order | null;
}

export interface OrderPayPageGetDataQueryVariables {
  orderId: string;
}
