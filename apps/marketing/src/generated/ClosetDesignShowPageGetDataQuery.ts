/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus, FileType, DesignRequestHistoryItemDesignRequestEventMethod } from "./globalTypes";

// ====================================================
// GraphQL query operation: ClosetDesignShowPageGetDataQuery
// ====================================================

export interface ClosetDesignShowPageGetDataQuery_designRequest_designRequestLocations_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_designRequestLocations_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type ClosetDesignShowPageGetDataQuery_designRequest_designRequestLocations_files = ClosetDesignShowPageGetDataQuery_designRequest_designRequestLocations_files_FileUnknown | ClosetDesignShowPageGetDataQuery_designRequest_designRequestLocations_files_FileImage;

export interface ClosetDesignShowPageGetDataQuery_designRequest_designRequestLocations {
  __typename: "DesignRequestDesignLocation";
  id: string;
  description: string | null;
  placement: string | null;
  fileIds: string[];
  files: ClosetDesignShowPageGetDataQuery_designRequest_designRequestLocations_files[];
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type ClosetDesignShowPageGetDataQuery_designRequest_files = ClosetDesignShowPageGetDataQuery_designRequest_files_FileUnknown | ClosetDesignShowPageGetDataQuery_designRequest_files_FileImage;

export interface ClosetDesignShowPageGetDataQuery_designRequest_latestProofs_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_latestProofs_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type ClosetDesignShowPageGetDataQuery_designRequest_latestProofs_files = ClosetDesignShowPageGetDataQuery_designRequest_latestProofs_files_FileUnknown | ClosetDesignShowPageGetDataQuery_designRequest_latestProofs_files_FileImage;

export interface ClosetDesignShowPageGetDataQuery_designRequest_latestProofs_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_latestProofs {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  note: string | null;
  files: ClosetDesignShowPageGetDataQuery_designRequest_latestProofs_files[];
  artist: ClosetDesignShowPageGetDataQuery_designRequest_latestProofs_artist | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage_files = ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage_files_FileUnknown | ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage_files_FileImage;

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage_sender {
  __typename: "User";
  id: string | null;
  picture: string | null;
  name: string | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string;
  createdAt: any;
  viewerIsSender: boolean;
  files: ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage_files[];
  sender: ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage_sender | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestHistoryItemDesignRequestEvent_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestHistoryItemDesignRequestEvent {
  __typename: "DesignRequestHistoryItemDesignRequestEvent";
  id: string;
  timestamp: any;
  method: DesignRequestHistoryItemDesignRequestEventMethod;
  user: ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestHistoryItemDesignRequestEvent_user | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignProof_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignProof_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignProof_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type ClosetDesignShowPageGetDataQuery_designRequest_history_DesignProof_files = ClosetDesignShowPageGetDataQuery_designRequest_history_DesignProof_files_FileUnknown | ClosetDesignShowPageGetDataQuery_designRequest_history_DesignProof_files_FileImage;

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignProof {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  note: string | null;
  artist: ClosetDesignShowPageGetDataQuery_designRequest_history_DesignProof_artist | null;
  files: ClosetDesignShowPageGetDataQuery_designRequest_history_DesignProof_files[];
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevisionRequest_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevisionRequest_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevisionRequest_files = ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevisionRequest_files_FileUnknown | ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevisionRequest_files_FileImage;

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevisionRequest_user {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevisionRequest {
  __typename: "DesignRequestRevisionRequest";
  id: string;
  createdAt: any;
  description: string;
  files: ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevisionRequest_files[];
  user: ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevisionRequest_user | null;
}

export type ClosetDesignShowPageGetDataQuery_designRequest_history = ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage | ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestHistoryItemDesignRequestEvent | ClosetDesignShowPageGetDataQuery_designRequest_history_DesignProof | ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevisionRequest;

export interface ClosetDesignShowPageGetDataQuery_designRequest_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_proofs_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_proofs_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type ClosetDesignShowPageGetDataQuery_designRequest_proofs_files = ClosetDesignShowPageGetDataQuery_designRequest_proofs_files_FileUnknown | ClosetDesignShowPageGetDataQuery_designRequest_proofs_files_FileImage;

export interface ClosetDesignShowPageGetDataQuery_designRequest_proofs_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_proofs {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  note: string | null;
  files: ClosetDesignShowPageGetDataQuery_designRequest_proofs_files[];
  artist: ClosetDesignShowPageGetDataQuery_designRequest_proofs_artist | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  name: string;
  status: DesignRequestStatus;
  description: string | null;
  fileUploadDirectory: string;
  useCase: string | null;
  fileIds: string[];
  designRequestLocations: ClosetDesignShowPageGetDataQuery_designRequest_designRequestLocations[];
  files: ClosetDesignShowPageGetDataQuery_designRequest_files[];
  latestProofs: ClosetDesignShowPageGetDataQuery_designRequest_latestProofs[];
  history: ClosetDesignShowPageGetDataQuery_designRequest_history[];
  user: ClosetDesignShowPageGetDataQuery_designRequest_user | null;
  proofs: ClosetDesignShowPageGetDataQuery_designRequest_proofs[];
}

export interface ClosetDesignShowPageGetDataQuery {
  designRequest: ClosetDesignShowPageGetDataQuery_designRequest | null;
}

export interface ClosetDesignShowPageGetDataQueryVariables {
  designId: string;
}
