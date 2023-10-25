/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubscriberCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GuideShowPageMarketingSubscribeMutation
// ====================================================

export interface GuideShowPageMarketingSubscribeMutation_subscriberCreate_subscriber {
  __typename: "Subscriber";
  id: string;
}

export interface GuideShowPageMarketingSubscribeMutation_subscriberCreate {
  __typename: "SubscriberCreatePayload";
  subscriber: GuideShowPageMarketingSubscribeMutation_subscriberCreate_subscriber | null;
}

export interface GuideShowPageMarketingSubscribeMutation {
  /**
   * Creates a new email subscriber
   */
  subscriberCreate: GuideShowPageMarketingSubscribeMutation_subscriberCreate | null;
}

export interface GuideShowPageMarketingSubscribeMutationVariables {
  input: SubscriberCreateInput;
}
