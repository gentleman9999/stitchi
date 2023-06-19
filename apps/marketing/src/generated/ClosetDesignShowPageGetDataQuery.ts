/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: ClosetDesignShowPageGetDataQuery
// ====================================================

export interface ClosetDesignShowPageGetDataQuery_designRequest_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  url: string;
  name: string;
  humanizedBytes: string;
}

export interface ClosetDesignShowPageGetDataQuery_designRequest_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  name: string;
  humanizedBytes: string;
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
