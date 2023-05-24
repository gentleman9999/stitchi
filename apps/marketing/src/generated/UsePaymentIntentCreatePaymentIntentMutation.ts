/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentIntentCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UsePaymentIntentCreatePaymentIntentMutation
// ====================================================

export interface UsePaymentIntentCreatePaymentIntentMutation_paymentIntentCreate_paymentIntent {
  __typename: "PaymentIntent";
  id: string;
  clientSecret: string | null;
  amount: number;
}

export interface UsePaymentIntentCreatePaymentIntentMutation_paymentIntentCreate {
  __typename: "PaymentIntentCreatePayload";
  paymentIntent: UsePaymentIntentCreatePaymentIntentMutation_paymentIntentCreate_paymentIntent | null;
}

export interface UsePaymentIntentCreatePaymentIntentMutation {
  paymentIntentCreate: UsePaymentIntentCreatePaymentIntentMutation_paymentIntentCreate | null;
}

export interface UsePaymentIntentCreatePaymentIntentMutationVariables {
  input: PaymentIntentCreateInput;
}
