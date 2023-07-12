/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus, DesignRequestHistoryItemDesignRequestEventMethod } from "./globalTypes";

// ====================================================
// GraphQL query operation: DesignRequestActivityGetDataQuery
// ====================================================

export interface DesignRequestActivityGetDataQuery_designRequest_history_ConversationMessage_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignRequestActivityGetDataQuery_designRequest_history_ConversationMessage_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignRequestActivityGetDataQuery_designRequest_history_ConversationMessage_files = DesignRequestActivityGetDataQuery_designRequest_history_ConversationMessage_files_FileUnknown | DesignRequestActivityGetDataQuery_designRequest_history_ConversationMessage_files_FileImage;

export interface DesignRequestActivityGetDataQuery_designRequest_history_ConversationMessage_sender {
  __typename: "User";
  id: string | null;
  picture: string | null;
  name: string | null;
}

export interface DesignRequestActivityGetDataQuery_designRequest_history_ConversationMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string;
  createdAt: any;
  viewerIsSender: boolean;
  files: DesignRequestActivityGetDataQuery_designRequest_history_ConversationMessage_files[];
  sender: DesignRequestActivityGetDataQuery_designRequest_history_ConversationMessage_sender | null;
}

export interface DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestHistoryItemDesignRequestEvent_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestHistoryItemDesignRequestEvent {
  __typename: "DesignRequestHistoryItemDesignRequestEvent";
  id: string;
  timestamp: any;
  method: DesignRequestHistoryItemDesignRequestEventMethod;
  user: DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestHistoryItemDesignRequestEvent_user | null;
}

export interface DesignRequestActivityGetDataQuery_designRequest_history_DesignProof_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignRequestActivityGetDataQuery_designRequest_history_DesignProof_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignRequestActivityGetDataQuery_designRequest_history_DesignProof_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignRequestActivityGetDataQuery_designRequest_history_DesignProof_files = DesignRequestActivityGetDataQuery_designRequest_history_DesignProof_files_FileUnknown | DesignRequestActivityGetDataQuery_designRequest_history_DesignProof_files_FileImage;

export interface DesignRequestActivityGetDataQuery_designRequest_history_DesignProof {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  note: string | null;
  artist: DesignRequestActivityGetDataQuery_designRequest_history_DesignProof_artist | null;
  files: DesignRequestActivityGetDataQuery_designRequest_history_DesignProof_files[];
}

export interface DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestRevisionRequest_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestRevisionRequest_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestRevisionRequest_files = DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestRevisionRequest_files_FileUnknown | DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestRevisionRequest_files_FileImage;

export interface DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestRevisionRequest_user {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestRevisionRequest {
  __typename: "DesignRequestRevisionRequest";
  id: string;
  createdAt: any;
  description: string;
  files: DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestRevisionRequest_files[];
  user: DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestRevisionRequest_user | null;
}

export type DesignRequestActivityGetDataQuery_designRequest_history = DesignRequestActivityGetDataQuery_designRequest_history_ConversationMessage | DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestHistoryItemDesignRequestEvent | DesignRequestActivityGetDataQuery_designRequest_history_DesignProof | DesignRequestActivityGetDataQuery_designRequest_history_DesignRequestRevisionRequest;

export interface DesignRequestActivityGetDataQuery_designRequest_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestActivityGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  status: DesignRequestStatus;
  history: DesignRequestActivityGetDataQuery_designRequest_history[];
  fileUploadDirectory: string;
  user: DesignRequestActivityGetDataQuery_designRequest_user | null;
}

export interface DesignRequestActivityGetDataQuery {
  designRequest: DesignRequestActivityGetDataQuery_designRequest | null;
}

export interface DesignRequestActivityGetDataQueryVariables {
  designRequestId: string;
}
