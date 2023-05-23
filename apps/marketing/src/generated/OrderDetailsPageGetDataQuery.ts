/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrderDetailsPageGetDataQuery
// ====================================================

export interface OrderDetailsPageGetDataQuery_order_items {
  __typename: "OrderItem";
  id: string;
  quantity: number;
  title: string;
  unitPriceCents: number;
  totalPriceCents: number;
}

export interface OrderDetailsPageGetDataQuery_order {
  __typename: "Order";
  id: string;
  humanOrderId: string;
  customerFullName: string | null;
  humanPaymentStatus: string;
  totalTaxCents: number;
  totalShippingCents: number;
  subtotalPriceCents: number;
  totalProcessingFeeCents: number;
  totalPriceCents: number;
  items: OrderDetailsPageGetDataQuery_order_items[];
}

export interface OrderDetailsPageGetDataQuery {
  order: OrderDetailsPageGetDataQuery_order | null;
}

export interface OrderDetailsPageGetDataQueryVariables {
  orderId: string;
}
