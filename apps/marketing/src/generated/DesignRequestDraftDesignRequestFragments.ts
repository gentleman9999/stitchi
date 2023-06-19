/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignRequestDraftDesignRequestFragments
// ====================================================

export interface DesignRequestDraftDesignRequestFragments_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  url: string;
  name: string;
  humanizedBytes: string;
}

export interface DesignRequestDraftDesignRequestFragments_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  name: string;
  humanizedBytes: string;
  width: number;
  height: number;
}

export type DesignRequestDraftDesignRequestFragments_files = DesignRequestDraftDesignRequestFragments_files_FileUnknown | DesignRequestDraftDesignRequestFragments_files_FileImage;

export interface DesignRequestDraftDesignRequestFragments {
  __typename: "DesignRequest";
  id: string;
  description: string | null;
  fileUploadDirectory: string;
  fileIds: string[];
  files: DesignRequestDraftDesignRequestFragments_files[];
}
