/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrderDetailsPageBillingDetailsOrderFragment
// ====================================================

export interface OrderDetailsPageBillingDetailsOrderFragment_paymentIntents {
  __typename: "PaymentIntent";
  id: string;
  amount: number;
}

export interface OrderDetailsPageBillingDetailsOrderFragment {
  __typename: "Order";
  id: string;
  totalTaxCents: number;
  totalShippingCents: number;
  totalPriceCents: number;
  subtotalPriceCents: number;
  totalProcessingFeeCents: number;
  paymentIntents: OrderDetailsPageBillingDetailsOrderFragment_paymentIntents[];
}
