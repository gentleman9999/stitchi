/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileType } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment
// ====================================================

export interface DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment_designRequestLocations_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment_designRequestLocations_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment_designRequestLocations_files = DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment_designRequestLocations_files_FileUnknown | DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment_designRequestLocations_files_FileImage;

export interface DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment_designRequestLocations {
  __typename: "DesignRequestDesignLocation";
  id: string;
  description: string | null;
  placement: string | null;
  files: DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment_designRequestLocations_files[];
}

export interface DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment {
  __typename: "DesignRequest";
  id: string;
  description: string | null;
  useCase: string | null;
  designRequestLocations: DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment_designRequestLocations[];
}
