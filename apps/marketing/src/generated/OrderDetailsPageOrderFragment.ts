/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderPaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: OrderDetailsPageOrderFragment
// ====================================================

export interface OrderDetailsPageOrderFragment_items {
  __typename: "OrderItem";
  id: string;
  title: string;
  quantity: number;
  unitPriceCents: number;
  totalPriceCents: number;
}

export interface OrderDetailsPageOrderFragment_lastPaymentMethod_card {
  __typename: "PaymentMethodCard";
  brand: string | null;
  last4: string | null;
  expMonth: number | null;
  expYear: number | null;
}

export interface OrderDetailsPageOrderFragment_lastPaymentMethod_billingDetails {
  __typename: "PaymentMethodBillingDetails";
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
}

export interface OrderDetailsPageOrderFragment_lastPaymentMethod {
  __typename: "PaymentMethod";
  id: string;
  type: string;
  card: OrderDetailsPageOrderFragment_lastPaymentMethod_card | null;
  billingDetails: OrderDetailsPageOrderFragment_lastPaymentMethod_billingDetails | null;
}

export interface OrderDetailsPageOrderFragment_fulfillments_trackingInfo {
  __typename: "FulfillmentTrackingInfo";
  id: string;
  trackingNumber: string;
  trackingUrl: string;
}

export interface OrderDetailsPageOrderFragment_fulfillments {
  __typename: "Fulfillment";
  id: string;
  trackingInfo: OrderDetailsPageOrderFragment_fulfillments_trackingInfo;
}

export interface OrderDetailsPageOrderFragment_shippingAddress {
  __typename: "MailingAddress";
  id: string;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  phone: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  country: string | null;
  province: string | null;
  provinceCode: string | null;
  zip: string | null;
}

export interface OrderDetailsPageOrderFragment {
  __typename: "Order";
  id: string;
  createdAt: any;
  humanOrderId: string;
  paymentStatus: OrderPaymentStatus;
  humanPaymentStatus: string;
  totalTaxCents: number;
  totalShippingCents: number;
  subtotalPriceCents: number;
  totalProcessingFeeCents: number;
  totalPriceCents: number;
  items: OrderDetailsPageOrderFragment_items[];
  totalAmountDueCents: number;
  totalAmountRefundedCents: number;
  lastPaymentMethod: OrderDetailsPageOrderFragment_lastPaymentMethod | null;
  customerEmail: string | null;
  customerPhone: string | null;
  fulfillments: OrderDetailsPageOrderFragment_fulfillments[];
  shippingAddress: OrderDetailsPageOrderFragment_shippingAddress | null;
}
