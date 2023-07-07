/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileType } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignRequestDraftDesignRequestFragments
// ====================================================

export interface DesignRequestDraftDesignRequestFragments_designRequestLocations {
  __typename: "DesignRequestDesignLocation";
  id: string;
  description: string | null;
  placement: string | null;
  fileIds: string[];
}

export interface DesignRequestDraftDesignRequestFragments_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignRequestDraftDesignRequestFragments_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignRequestDraftDesignRequestFragments_files = DesignRequestDraftDesignRequestFragments_files_FileUnknown | DesignRequestDraftDesignRequestFragments_files_FileImage;

export interface DesignRequestDraftDesignRequestFragments {
  __typename: "DesignRequest";
  id: string;
  fileUploadDirectory: string;
  useCase: string | null;
  fileIds: string[];
  designRequestLocations: DesignRequestDraftDesignRequestFragments_designRequestLocations[];
  files: DesignRequestDraftDesignRequestFragments_files[];
}
