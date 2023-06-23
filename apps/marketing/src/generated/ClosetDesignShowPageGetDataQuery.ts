/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus, FileType, DesignRequestHistoryItemDesignRequestEventMethod } from "./globalTypes";

// ====================================================
// GraphQL query operation: ClosetDesignShowPageGetDataQuery
// ====================================================

export interface ClosetDesignShowPageGetDataQuery_designRequest_designLocations_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_designLocations_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type ClosetDesignShowPageGetDataQuery_designRequest_designLocations_files = ClosetDesignShowPageGetDataQuery_designRequest_designLocations_files_FileUnknown | ClosetDesignShowPageGetDataQuery_designRequest_designLocations_files_FileImage;

export interface ClosetDesignShowPageGetDataQuery_designRequest_designLocations {
  __typename: "DesignRequestDesignLocation";
  id: string;
  description: string | null;
  placement: string | null;
  fileIds: string[];
  files: ClosetDesignShowPageGetDataQuery_designRequest_designLocations_files[];
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

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage_sender {
  __typename: "User";
  id: string | null;
  picture: string | null;
  name: string | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage {
  __typename: "ConversationMessage";
  id: string;
  content: string;
  createdAt: any;
  viewerIsSender: boolean;
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

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestProof_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestProof {
  __typename: "DesignRequestProof";
  id: string;
  createdAt: any;
  artistNote: string | null;
  artist: ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestProof_artist | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevision_user {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevision {
  __typename: "DesignRequestRevision";
  id: string;
  createdAt: any;
  description: string;
  user: ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevision_user | null;
}

export type ClosetDesignShowPageGetDataQuery_designRequest_history = ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage | ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestHistoryItemDesignRequestEvent | ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestProof | ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestRevision;

export interface ClosetDesignShowPageGetDataQuery_designRequest_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_proofs_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_proofs {
  __typename: "DesignRequestProof";
  id: string;
  artistNote: string | null;
  createdAt: any;
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
  designLocations: ClosetDesignShowPageGetDataQuery_designRequest_designLocations[];
  files: ClosetDesignShowPageGetDataQuery_designRequest_files[];
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
