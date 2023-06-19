/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AdditionalInformationFormDesignRequestFragment
// ====================================================

export interface AdditionalInformationFormDesignRequestFragment_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  url: string;
  name: string;
  humanizedBytes: string;
}

export interface AdditionalInformationFormDesignRequestFragment_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  name: string;
  humanizedBytes: string;
  width: number;
  height: number;
}

export type AdditionalInformationFormDesignRequestFragment_files = AdditionalInformationFormDesignRequestFragment_files_FileUnknown | AdditionalInformationFormDesignRequestFragment_files_FileImage;

export interface AdditionalInformationFormDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  files: AdditionalInformationFormDesignRequestFragment_files[];
}
