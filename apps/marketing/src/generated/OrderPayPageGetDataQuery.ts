/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrderPayPageGetDataQuery
// ====================================================

export interface OrderPayPageGetDataQuery_order_itemSummaries {
  __typename: "OrderItemSummary";
  id: string;
  title: string;
  quantity: number;
  totalPriceCents: number;
}

export interface OrderPayPageGetDataQuery_order {
  __typename: "Order";
  id: string;
  totalAmountDueCents: number;
  totalTaxCents: number;
  totalPriceCents: number;
  totalShippingCents: number;
  subtotalPriceCents: number;
  totalProcessingFeeCents: number;
  totalAmountPaidCents: number;
  itemSummaries: OrderPayPageGetDataQuery_order_itemSummaries[];
}

export interface OrderPayPageGetDataQuery {
  order: OrderPayPageGetDataQuery_order | null;
}

export interface OrderPayPageGetDataQueryVariables {
  orderId: string;
}
