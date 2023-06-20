/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileType } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignRequestSubmittedDesignRequestFragment
// ====================================================

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
  description: string | null;
  useCase: string | null;
  designLocations: DesignRequestSubmittedDesignRequestFragment_designLocations[];
}
