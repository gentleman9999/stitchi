/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderPaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: ClosetOrdersDesktopTableOrderFragment
// ====================================================

export interface ClosetOrdersDesktopTableOrderFragment {
  __typename: "Order";
  id: string;
  humanOrderId: string;
  paymentStatus: OrderPaymentStatus;
  humanPaymentStatus: string;
  totalTaxCents: number;
  totalPriceCents: number;
  createdAt: any;
}
