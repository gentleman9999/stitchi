/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrderDetailsPageOrderFragment
// ====================================================

export interface OrderDetailsPageOrderFragment_items {
  __typename: "OrderItem";
  id: string;
  quantity: number;
  title: string;
  unitPriceCents: number;
  totalPriceCents: number;
}

export interface OrderDetailsPageOrderFragment {
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
  items: OrderDetailsPageOrderFragment_items[];
}
