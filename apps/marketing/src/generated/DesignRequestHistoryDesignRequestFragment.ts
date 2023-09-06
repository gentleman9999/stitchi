/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestHistoryItemDesignRequestEventMethod } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignRequestHistoryDesignRequestFragment
// ====================================================

export interface DesignRequestHistoryDesignRequestFragment_history_ConversationMessage_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignRequestHistoryDesignRequestFragment_history_ConversationMessage_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignRequestHistoryDesignRequestFragment_history_ConversationMessage_files = DesignRequestHistoryDesignRequestFragment_history_ConversationMessage_files_FileUnknown | DesignRequestHistoryDesignRequestFragment_history_ConversationMessage_files_FileImage;

export interface DesignRequestHistoryDesignRequestFragment_history_ConversationMessage_sender_user {
  __typename: "User";
  id: string;
  picture: string | null;
  name: string | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_ConversationMessage_sender {
  __typename: "Membership";
  id: string;
  user: DesignRequestHistoryDesignRequestFragment_history_ConversationMessage_sender_user | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_ConversationMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string;
  createdAt: any;
  viewerIsSender: boolean;
  files: DesignRequestHistoryDesignRequestFragment_history_ConversationMessage_files[];
  sender: DesignRequestHistoryDesignRequestFragment_history_ConversationMessage_sender | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent_actor_user {
  __typename: "User";
  id: string;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent_actor {
  __typename: "Membership";
  id: string;
  user: DesignRequestHistoryDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent_actor_user | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent {
  __typename: "DesignRequestHistoryItemDesignRequestEvent";
  id: string;
  timestamp: any;
  method: DesignRequestHistoryItemDesignRequestEventMethod;
  actor: DesignRequestHistoryDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent_actor | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignProof_artist_user {
  __typename: "User";
  id: string;
  name: string | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignProof_artist {
  __typename: "Membership";
  id: string;
  user: DesignRequestHistoryDesignRequestFragment_history_DesignProof_artist_user | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignProof_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignProof {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  artist: DesignRequestHistoryDesignRequestFragment_history_DesignProof_artist | null;
  primaryImageFile: DesignRequestHistoryDesignRequestFragment_history_DesignProof_primaryImageFile | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevisionRequest_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevisionRequest_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevisionRequest_files = DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevisionRequest_files_FileUnknown | DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevisionRequest_files_FileImage;

export interface DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevisionRequest_membership_user {
  __typename: "User";
  id: string;
  name: string | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevisionRequest_membership {
  __typename: "Membership";
  id: string;
  user: DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevisionRequest_membership_user | null;
}

export interface DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevisionRequest {
  __typename: "DesignRequestRevisionRequest";
  id: string;
  createdAt: any;
  description: string;
  files: DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevisionRequest_files[];
  membership: DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevisionRequest_membership | null;
}

export type DesignRequestHistoryDesignRequestFragment_history = DesignRequestHistoryDesignRequestFragment_history_ConversationMessage | DesignRequestHistoryDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent | DesignRequestHistoryDesignRequestFragment_history_DesignProof | DesignRequestHistoryDesignRequestFragment_history_DesignRequestRevisionRequest;

export interface DesignRequestHistoryDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  history: DesignRequestHistoryDesignRequestFragment_history[];
}
