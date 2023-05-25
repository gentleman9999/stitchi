/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrderDetailsPageBillingDetailsOrderFragment
// ====================================================

export interface OrderDetailsPageBillingDetailsOrderFragment_lastPaymentMethod_card {
  __typename: "PaymentMethodCard";
  brand: string | null;
  last4: string | null;
  expMonth: number | null;
  expYear: number | null;
}

export interface OrderDetailsPageBillingDetailsOrderFragment_lastPaymentMethod_billingDetails {
  __typename: "PaymentMethodBillingDetails";
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
}

export interface OrderDetailsPageBillingDetailsOrderFragment_lastPaymentMethod {
  __typename: "PaymentMethod";
  id: string;
  type: string;
  card: OrderDetailsPageBillingDetailsOrderFragment_lastPaymentMethod_card | null;
  billingDetails: OrderDetailsPageBillingDetailsOrderFragment_lastPaymentMethod_billingDetails | null;
}

export interface OrderDetailsPageBillingDetailsOrderFragment {
  __typename: "Order";
  id: string;
  totalTaxCents: number;
  totalShippingCents: number;
  totalPriceCents: number;
  subtotalPriceCents: number;
  totalProcessingFeeCents: number;
  totalAmountDueCents: number;
  totalAmountRefundedCents: number;
  lastPaymentMethod: OrderDetailsPageBillingDetailsOrderFragment_lastPaymentMethod | null;
}
