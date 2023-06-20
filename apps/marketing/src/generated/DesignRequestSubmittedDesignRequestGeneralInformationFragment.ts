/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileType } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignRequestSubmittedDesignRequestGeneralInformationFragment
// ====================================================

export interface DesignRequestSubmittedDesignRequestGeneralInformationFragment_designLocations_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignRequestSubmittedDesignRequestGeneralInformationFragment_designLocations_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignRequestSubmittedDesignRequestGeneralInformationFragment_designLocations_files = DesignRequestSubmittedDesignRequestGeneralInformationFragment_designLocations_files_FileUnknown | DesignRequestSubmittedDesignRequestGeneralInformationFragment_designLocations_files_FileImage;

export interface DesignRequestSubmittedDesignRequestGeneralInformationFragment_designLocations {
  __typename: "DesignRequestDesignLocation";
  id: string;
  description: string | null;
  placement: string | null;
  files: DesignRequestSubmittedDesignRequestGeneralInformationFragment_designLocations_files[];
}

export interface DesignRequestSubmittedDesignRequestGeneralInformationFragment {
  __typename: "DesignRequest";
  id: string;
  description: string | null;
  useCase: string | null;
  designLocations: DesignRequestSubmittedDesignRequestGeneralInformationFragment_designLocations[];
}
