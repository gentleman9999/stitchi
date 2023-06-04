/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrderPayPageOrderFragment
// ====================================================

export interface OrderPayPageOrderFragment_itemSummaries {
  __typename: "OrderItemSummary";
  id: string;
  title: string;
  quantity: number;
  totalPriceCents: number;
}

export interface OrderPayPageOrderFragment {
  __typename: "Order";
  id: string;
  totalTaxCents: number;
  totalPriceCents: number;
  totalShippingCents: number;
  subtotalPriceCents: number;
  totalProcessingFeeCents: number;
  totalAmountPaidCents: number;
  totalAmountDueCents: number;
  itemSummaries: OrderPayPageOrderFragment_itemSummaries[];
}
