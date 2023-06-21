/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestHistoryItemDesignRequestEventMethod } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignRequestHistoryDesignRequestFragment
// ====================================================

export interface DesignRequestHistoryDesignRequestFragment_history_ConversationMessage_sender {
  __typename: "User";
  id: string | null;
  picture: string | null;
  name: string | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_ConversationMessage {
  __typename: "ConversationMessage";
  id: string;
  content: string;
  createdAt: any;
  sender: DesignRequestHistoryDesignRequestFragment_history_ConversationMessage_sender | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent {
  __typename: "DesignRequestHistoryItemDesignRequestEvent";
  id: string;
  timestamp: any;
  method: DesignRequestHistoryItemDesignRequestEventMethod;
  user: DesignRequestHistoryDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent_user | null;
}

export type DesignRequestHistoryDesignRequestFragment_history = DesignRequestHistoryDesignRequestFragment_history_ConversationMessage | DesignRequestHistoryDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent;

export interface DesignRequestHistoryDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  history: DesignRequestHistoryDesignRequestFragment_history[];
}
