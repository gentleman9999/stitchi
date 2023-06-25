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
  viewerIsSender: boolean;
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

export interface DesignRequestHistoryDesignRequestFragment_history_DesignProof_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignProof_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignProof_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignRequestHistoryDesignRequestFragment_history_DesignProof_files = DesignRequestHistoryDesignRequestFragment_history_DesignProof_files_FileUnknown | DesignRequestHistoryDesignRequestFragment_history_DesignProof_files_FileImage;

export interface DesignRequestHistoryDesignRequestFragment_history_DesignProof {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  note: string | null;
  artist: DesignRequestHistoryDesignRequestFragment_history_DesignProof_artist | null;
  files: DesignRequestHistoryDesignRequestFragment_history_DesignProof_files[];
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevision_user {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevision {
  __typename: "DesignRequestRevision";
  id: string;
  createdAt: any;
  description: string;
  user: DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevision_user | null;
}

export type DesignRequestHistoryDesignRequestFragment_history = DesignRequestHistoryDesignRequestFragment_history_ConversationMessage | DesignRequestHistoryDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent | DesignRequestHistoryDesignRequestFragment_history_DesignProof | DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevision;

export interface DesignRequestHistoryDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  history: DesignRequestHistoryDesignRequestFragment_history[];
}
