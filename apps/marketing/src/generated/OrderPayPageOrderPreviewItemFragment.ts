/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrderPayPageOrderPreviewItemFragment
// ====================================================

export interface OrderPayPageOrderPreviewItemFragment_itemSummaries {
  __typename: "OrderItemSummary";
  id: string;
  title: string;
  quantity: number;
  totalPriceCents: number;
}

export interface OrderPayPageOrderPreviewItemFragment {
  __typename: "Order";
  id: string;
  totalTaxCents: number;
  totalPriceCents: number;
  totalAmountPaidCents: number;
  totalAmountDueCents: number;
  totalShippingCents: number;
  subtotalPriceCents: number;
  totalProcessingFeeCents: number;
  itemSummaries: OrderPayPageOrderPreviewItemFragment_itemSummaries[];
}
