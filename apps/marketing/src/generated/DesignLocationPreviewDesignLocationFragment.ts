/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileType } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignLocationPreviewDesignLocationFragment
// ====================================================

export interface DesignLocationPreviewDesignLocationFragment_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignLocationPreviewDesignLocationFragment_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignLocationPreviewDesignLocationFragment_files = DesignLocationPreviewDesignLocationFragment_files_FileUnknown | DesignLocationPreviewDesignLocationFragment_files_FileImage;

export interface DesignLocationPreviewDesignLocationFragment {
  __typename: "DesignRequestDesignLocation";
  id: string;
  description: string | null;
  placement: string | null;
  files: DesignLocationPreviewDesignLocationFragment_files[];
}
