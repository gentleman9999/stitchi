/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotificationMarkAsSeenInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseMarkNotificationAsSeenMarkAsSeenMutation
// ====================================================

export interface UseMarkNotificationAsSeenMarkAsSeenMutation_notificationMarkAsSeen_notification {
  __typename: "Notification";
  id: string;
}

export interface UseMarkNotificationAsSeenMarkAsSeenMutation_notificationMarkAsSeen {
  __typename: "NotificationMarkAsSeenPayload";
  notification: UseMarkNotificationAsSeenMarkAsSeenMutation_notificationMarkAsSeen_notification | null;
}

export interface UseMarkNotificationAsSeenMarkAsSeenMutation {
  notificationMarkAsSeen: UseMarkNotificationAsSeenMarkAsSeenMutation_notificationMarkAsSeen | null;
}

export interface UseMarkNotificationAsSeenMarkAsSeenMutationVariables {
  input: NotificationMarkAsSeenInput;
}
