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

export interface OrderDetailsPageGetDataQuery_order_fulfillments_trackingInfo {
  __typename: "FulfillmentTrackingInfo";
  id: string;
  trackingNumber: string;
  trackingUrl: string;
}

export interface OrderDetailsPageGetDataQuery_order_fulfillments {
  __typename: "Fulfillment";
  id: string;
  trackingInfo: OrderDetailsPageGetDataQuery_order_fulfillments_trackingInfo;
}

export interface OrderDetailsPageGetDataQuery_order_shippingAddress {
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
  fulfillments: OrderDetailsPageGetDataQuery_order_fulfillments[];
  shippingAddress: OrderDetailsPageGetDataQuery_order_shippingAddress | null;
}

export interface OrderDetailsPageGetDataQuery {
  order: OrderDetailsPageGetDataQuery_order | null;
}

export interface OrderDetailsPageGetDataQueryVariables {
  orderId: string;
}
