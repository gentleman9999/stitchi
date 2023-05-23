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
  humanOrderId: string;
  customerFullName: string | null;
  humanPaymentStatus: string;
  totalTaxCents: number;
  totalShippingCents: number;
  subtotalPriceCents: number;
  totalProcessingFeeCents: number;
  totalPriceCents: number;
  items: OrderDetailsPageOrderFragment_items[];
  fulfillments: OrderDetailsPageOrderFragment_fulfillments[];
  shippingAddress: OrderDetailsPageOrderFragment_shippingAddress | null;
}
