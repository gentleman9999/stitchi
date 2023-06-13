/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubscriberCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseSubscribeInlineSubscribeMutation
// ====================================================

export interface UseSubscribeInlineSubscribeMutation_subscriberCreate_subscriber {
  __typename: "Subscriber";
  id: string;
  email: string;
}

export interface UseSubscribeInlineSubscribeMutation_subscriberCreate {
  __typename: "SubscriberCreatePayload";
  subscriber: UseSubscribeInlineSubscribeMutation_subscriberCreate_subscriber | null;
}

export interface UseSubscribeInlineSubscribeMutation {
  /**
   * Creates a new email subscriber
   */
  subscriberCreate: UseSubscribeInlineSubscribeMutation_subscriberCreate | null;
}

export interface UseSubscribeInlineSubscribeMutationVariables {
  input: SubscriberCreateInput;
}
