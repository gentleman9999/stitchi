/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileType } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignLocationFormDesignLocationFragment
// ====================================================

export interface DesignLocationFormDesignLocationFragment_files {
  __typename: "FileUnknown" | "FileImage" | "FilePdf";
  id: string;
  humanizedBytes: string;
  fileType: FileType;
  url: string;
  name: string;
}

export interface DesignLocationFormDesignLocationFragment {
  __typename: "DesignRequestDesignLocation";
  id: string;
  placement: string | null;
  description: string | null;
  fileIds: string[];
  files: DesignLocationFormDesignLocationFragment_files[];
}
