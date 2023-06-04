/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentIntentCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: OrderPayPageCreatepaymentIntent
// ====================================================

export interface OrderPayPageCreatepaymentIntent_paymentIntentCreate_paymentIntent {
  __typename: "PaymentIntent";
  id: string;
  clientSecret: string | null;
  amount: number;
}

export interface OrderPayPageCreatepaymentIntent_paymentIntentCreate {
  __typename: "PaymentIntentCreatePayload";
  paymentIntent: OrderPayPageCreatepaymentIntent_paymentIntentCreate_paymentIntent | null;
}

export interface OrderPayPageCreatepaymentIntent {
  paymentIntentCreate: OrderPayPageCreatepaymentIntent_paymentIntentCreate | null;
}

export interface OrderPayPageCreatepaymentIntentVariables {
  input: PaymentIntentCreateInput;
}
