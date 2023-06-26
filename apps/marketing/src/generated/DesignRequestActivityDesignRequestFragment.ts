/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus, DesignRequestHistoryItemDesignRequestEventMethod } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignRequestActivityDesignRequestFragment
// ====================================================

export interface DesignRequestActivityDesignRequestFragment_latestProofs_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignRequestActivityDesignRequestFragment_latestProofs_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignRequestActivityDesignRequestFragment_latestProofs_files = DesignRequestActivityDesignRequestFragment_latestProofs_files_FileUnknown | DesignRequestActivityDesignRequestFragment_latestProofs_files_FileImage;

export interface DesignRequestActivityDesignRequestFragment_latestProofs_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignRequestActivityDesignRequestFragment_latestProofs {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  note: string | null;
  files: DesignRequestActivityDesignRequestFragment_latestProofs_files[];
  artist: DesignRequestActivityDesignRequestFragment_latestProofs_artist | null;
}

export interface DesignRequestActivityDesignRequestFragment_history_ConversationMessage_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignRequestActivityDesignRequestFragment_history_ConversationMessage_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignRequestActivityDesignRequestFragment_history_ConversationMessage_files = DesignRequestActivityDesignRequestFragment_history_ConversationMessage_files_FileUnknown | DesignRequestActivityDesignRequestFragment_history_ConversationMessage_files_FileImage;

export interface DesignRequestActivityDesignRequestFragment_history_ConversationMessage_sender {
  __typename: "User";
  id: string | null;
  picture: string | null;
  name: string | null;
}

export interface DesignRequestActivityDesignRequestFragment_history_ConversationMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string;
  createdAt: any;
  viewerIsSender: boolean;
  files: DesignRequestActivityDesignRequestFragment_history_ConversationMessage_files[];
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

export interface DesignRequestActivityDesignRequestFragment_history_DesignRequestRevisionRequest_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignRequestActivityDesignRequestFragment_history_DesignRequestRevisionRequest_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignRequestActivityDesignRequestFragment_history_DesignRequestRevisionRequest_files = DesignRequestActivityDesignRequestFragment_history_DesignRequestRevisionRequest_files_FileUnknown | DesignRequestActivityDesignRequestFragment_history_DesignRequestRevisionRequest_files_FileImage;

export interface DesignRequestActivityDesignRequestFragment_history_DesignRequestRevisionRequest_user {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignRequestActivityDesignRequestFragment_history_DesignRequestRevisionRequest {
  __typename: "DesignRequestRevisionRequest";
  id: string;
  createdAt: any;
  description: string;
  files: DesignRequestActivityDesignRequestFragment_history_DesignRequestRevisionRequest_files[];
  user: DesignRequestActivityDesignRequestFragment_history_DesignRequestRevisionRequest_user | null;
}

export type DesignRequestActivityDesignRequestFragment_history = DesignRequestActivityDesignRequestFragment_history_ConversationMessage | DesignRequestActivityDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent | DesignRequestActivityDesignRequestFragment_history_DesignProof | DesignRequestActivityDesignRequestFragment_history_DesignRequestRevisionRequest;

export interface DesignRequestActivityDesignRequestFragment_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestActivityDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  status: DesignRequestStatus;
  latestProofs: DesignRequestActivityDesignRequestFragment_latestProofs[];
  history: DesignRequestActivityDesignRequestFragment_history[];
  fileUploadDirectory: string;
  user: DesignRequestActivityDesignRequestFragment_user | null;
}
