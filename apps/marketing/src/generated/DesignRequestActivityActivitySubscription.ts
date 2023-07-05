/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: DesignRequestActivityActivitySubscription
// ====================================================

export interface DesignRequestActivityActivitySubscription_designRequestHistoryItemAdded {
  __typename: "DesignRequestHistoryItemAddedPayload";
  historyItemAdded: boolean;
}

export interface DesignRequestActivityActivitySubscription {
  designRequestHistoryItemAdded: DesignRequestActivityActivitySubscription_designRequestHistoryItemAdded | null;
}

export interface DesignRequestActivityActivitySubscriptionVariables {
  designRequestId: string;
}
