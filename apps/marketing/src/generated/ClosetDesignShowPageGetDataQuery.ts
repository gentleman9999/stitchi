/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus, DesignRequestHistoryItemDesignRequestEventMethod, FileType } from "./globalTypes";

// ====================================================
// GraphQL query operation: ClosetDesignShowPageGetDataQuery
// ====================================================

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

export type ClosetDesignShowPageGetDataQuery_designRequest_history = ClosetDesignShowPageGetDataQuery_designRequest_history_ConversationMessage | ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestHistoryItemDesignRequestEvent | ClosetDesignShowPageGetDataQuery_designRequest_history_DesignRequestProof;

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
  files: ClosetDesignShowPageGetDataQuery_designRequest_designLocations_files[];
  fileIds: string[];
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
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

export interface ClosetDesignShowPageGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  name: string;
  status: DesignRequestStatus;
  description: string | null;
  history: ClosetDesignShowPageGetDataQuery_designRequest_history[];
  useCase: string | null;
  designLocations: ClosetDesignShowPageGetDataQuery_designRequest_designLocations[];
  user: ClosetDesignShowPageGetDataQuery_designRequest_user | null;
  fileUploadDirectory: string;
  fileIds: string[];
  files: ClosetDesignShowPageGetDataQuery_designRequest_files[];
}

export interface ClosetDesignShowPageGetDataQuery {
  designRequest: ClosetDesignShowPageGetDataQuery_designRequest | null;
}

export interface ClosetDesignShowPageGetDataQueryVariables {
  designId: string;
}
