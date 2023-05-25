/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderPaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: OrderDetailsPageGetDataQuery
// ====================================================

export interface OrderDetailsPageGetDataQuery_order_items {
  __typename: "OrderItem";
  id: string;
  title: string;
  quantity: number;
  unitPriceCents: number;
  totalPriceCents: number;
}

export interface OrderDetailsPageGetDataQuery_order_lastPaymentMethod_card {
  __typename: "PaymentMethodCard";
  brand: string | null;
  last4: string | null;
  expMonth: number | null;
  expYear: number | null;
}

export interface OrderDetailsPageGetDataQuery_order_lastPaymentMethod_billingDetails {
  __typename: "PaymentMethodBillingDetails";
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
}

export interface OrderDetailsPageGetDataQuery_order_lastPaymentMethod {
  __typename: "PaymentMethod";
  id: string;
  type: string;
  card: OrderDetailsPageGetDataQuery_order_lastPaymentMethod_card | null;
  billingDetails: OrderDetailsPageGetDataQuery_order_lastPaymentMethod_billingDetails | null;
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
  createdAt: any;
  humanOrderId: string;
  customerFullName: string | null;
  paymentStatus: OrderPaymentStatus;
  humanPaymentStatus: string;
  totalTaxCents: number;
  totalShippingCents: number;
  subtotalPriceCents: number;
  totalProcessingFeeCents: number;
  totalPriceCents: number;
  items: OrderDetailsPageGetDataQuery_order_items[];
  totalAmountDueCents: number;
  totalAmountRefundedCents: number;
  lastPaymentMethod: OrderDetailsPageGetDataQuery_order_lastPaymentMethod | null;
  fulfillments: OrderDetailsPageGetDataQuery_order_fulfillments[];
  shippingAddress: OrderDetailsPageGetDataQuery_order_shippingAddress | null;
}

export interface OrderDetailsPageGetDataQuery {
  order: OrderDetailsPageGetDataQuery_order | null;
}

export interface OrderDetailsPageGetDataQueryVariables {
  orderId: string;
}
