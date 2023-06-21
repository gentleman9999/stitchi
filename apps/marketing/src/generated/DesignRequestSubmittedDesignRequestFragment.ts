/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestHistoryItemDesignRequestEventMethod, FileType } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignRequestSubmittedDesignRequestFragment
// ====================================================

export interface DesignRequestSubmittedDesignRequestFragment_history_ConversationMessage_sender {
  __typename: "User";
  id: string | null;
  picture: string | null;
  name: string | null;
}

export interface DesignRequestSubmittedDesignRequestFragment_history_ConversationMessage {
  __typename: "ConversationMessage";
  id: string;
  content: string;
  createdAt: any;
  sender: DesignRequestSubmittedDesignRequestFragment_history_ConversationMessage_sender | null;
}

export interface DesignRequestSubmittedDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestSubmittedDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent {
  __typename: "DesignRequestHistoryItemDesignRequestEvent";
  id: string;
  timestamp: any;
  method: DesignRequestHistoryItemDesignRequestEventMethod;
  user: DesignRequestSubmittedDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent_user | null;
}

export type DesignRequestSubmittedDesignRequestFragment_history = DesignRequestSubmittedDesignRequestFragment_history_ConversationMessage | DesignRequestSubmittedDesignRequestFragment_history_DesignRequestHistoryItemDesignRequestEvent;

export interface DesignRequestSubmittedDesignRequestFragment_designLocations_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignRequestSubmittedDesignRequestFragment_designLocations_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignRequestSubmittedDesignRequestFragment_designLocations_files = DesignRequestSubmittedDesignRequestFragment_designLocations_files_FileUnknown | DesignRequestSubmittedDesignRequestFragment_designLocations_files_FileImage;

export interface DesignRequestSubmittedDesignRequestFragment_designLocations {
  __typename: "DesignRequestDesignLocation";
  id: string;
  description: string | null;
  placement: string | null;
  files: DesignRequestSubmittedDesignRequestFragment_designLocations_files[];
}

export interface DesignRequestSubmittedDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  history: DesignRequestSubmittedDesignRequestFragment_history[];
  description: string | null;
  useCase: string | null;
  designLocations: DesignRequestSubmittedDesignRequestFragment_designLocations[];
}
