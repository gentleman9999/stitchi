/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReferenceFilePreviewDesignRequestFragment
// ====================================================

export interface ReferenceFilePreviewDesignRequestFragment_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  url: string;
  name: string;
  humanizedBytes: string;
}

export interface ReferenceFilePreviewDesignRequestFragment_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  name: string;
  humanizedBytes: string;
  width: number;
  height: number;
}

export type ReferenceFilePreviewDesignRequestFragment_files = ReferenceFilePreviewDesignRequestFragment_files_FileUnknown | ReferenceFilePreviewDesignRequestFragment_files_FileImage;

export interface ReferenceFilePreviewDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  files: ReferenceFilePreviewDesignRequestFragment_files[];
}
