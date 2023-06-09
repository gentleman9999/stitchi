/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderPaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: ClosetOrdersMobileTableOrderFragment
// ====================================================

export interface ClosetOrdersMobileTableOrderFragment {
  __typename: "Order";
  id: string;
  totalPriceCents: number;
  totalTaxCents: number;
  paymentStatus: OrderPaymentStatus;
  createdAt: any;
  humanPaymentStatus: string;
  humanOrderId: string;
}
