/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileCreateBatchInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseFileUploadCreateFileMutation
// ====================================================

export interface UseFileUploadCreateFileMutation_fileCreateBatch_files {
  __typename: "FileUnknown" | "FileImage" | "FilePdf";
  id: string;
}

export interface UseFileUploadCreateFileMutation_fileCreateBatch {
  __typename: "FileCreateBatchPayload";
  files: UseFileUploadCreateFileMutation_fileCreateBatch_files[] | null;
}

export interface UseFileUploadCreateFileMutation {
  fileCreateBatch: UseFileUploadCreateFileMutation_fileCreateBatch | null;
}

export interface UseFileUploadCreateFileMutationVariables {
  input: FileCreateBatchInput;
}
