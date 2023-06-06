/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrderDetailsPageShippingDetailsOrderFragment
// ====================================================

export interface OrderDetailsPageShippingDetailsOrderFragment_fulfillments_trackingInfo {
  __typename: "FulfillmentTrackingInfo";
  id: string;
  trackingNumber: string;
  trackingUrl: string;
}

export interface OrderDetailsPageShippingDetailsOrderFragment_fulfillments {
  __typename: "Fulfillment";
  id: string;
  trackingInfo: OrderDetailsPageShippingDetailsOrderFragment_fulfillments_trackingInfo;
}

export interface OrderDetailsPageShippingDetailsOrderFragment_shippingAddress {
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

export interface OrderDetailsPageShippingDetailsOrderFragment {
  __typename: "Order";
  id: string;
  customerEmail: string | null;
  customerPhone: string | null;
  fulfillments: OrderDetailsPageShippingDetailsOrderFragment_fulfillments[];
  shippingAddress: OrderDetailsPageShippingDetailsOrderFragment_shippingAddress | null;
}
