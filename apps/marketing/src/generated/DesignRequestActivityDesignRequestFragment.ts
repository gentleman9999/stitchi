/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestHistoryItemDesignRequestEventMethod } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignRequestActivityDesignRequestFragment
// ====================================================

export interface DesignRequestActivityDesignRequestFragment_history_ConversationMessage_sender {
  __typename: "User";
  id: string | null;
  picture: string | null;
  name: string | null;
}

export interface DesignRequestActivityDesignRequestFragment_history_ConversationMessage {
  __typename: "ConversationMessage";
  id: string;
  content: string;
  createdAt: any;
  viewerIsSender: boolean;
  sender: DesignRequestActivityDesignRequestFragment_history_ConversationMessage_sender | null;
}

export interface DesignRequestActivityDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestActivityDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent {
  __typename: "DesignRequestHistoryItemDesignRequestEvent";
  id: string;
  timestamp: any;
  method: DesignRequestHistoryItemDesignRequestEventMethod;
  user: DesignRequestActivityDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent_user | null;
}

export interface DesignRequestActivityDesignRequestFragment_history_DesignProof_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignRequestActivityDesignRequestFragment_history_DesignProof_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignRequestActivityDesignRequestFragment_history_DesignProof_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignRequestActivityDesignRequestFragment_history_DesignProof_files = DesignRequestActivityDesignRequestFragment_history_DesignProof_files_FileUnknown | DesignRequestActivityDesignRequestFragment_history_DesignProof_files_FileImage;

export interface DesignRequestActivityDesignRequestFragment_history_DesignProof {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  note: string | null;
  artist: DesignRequestActivityDesignRequestFragment_history_DesignProof_artist | null;
  files: DesignRequestActivityDesignRequestFragment_history_DesignProof_files[];
}

export interface DesignRequestActivityDesignRequestFragment_history_DesignRequestRevision_user {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignRequestActivityDesignRequestFragment_history_DesignRequestRevision {
  __typename: "DesignRequestRevision";
  id: string;
  createdAt: any;
  description: string;
  user: DesignRequestActivityDesignRequestFragment_history_DesignRequestRevision_user | null;
}

export type DesignRequestActivityDesignRequestFragment_history = DesignRequestActivityDesignRequestFragment_history_ConversationMessage | DesignRequestActivityDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent | DesignRequestActivityDesignRequestFragment_history_DesignProof | DesignRequestActivityDesignRequestFragment_history_DesignRequestRevision;

export interface DesignRequestActivityDesignRequestFragment_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestActivityDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  history: DesignRequestActivityDesignRequestFragment_history[];
  user: DesignRequestActivityDesignRequestFragment_user | null;
}
