/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignProofCardDesignProofFragment
// ====================================================

export interface DesignProofCardDesignProofFragment_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignProofCardDesignProofFragment_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignProofCardDesignProofFragment_files = DesignProofCardDesignProofFragment_files_FileUnknown | DesignProofCardDesignProofFragment_files_FileImage;

export interface DesignProofCardDesignProofFragment_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignProofCardDesignProofFragment {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  note: string | null;
  files: DesignProofCardDesignProofFragment_files[];
  artist: DesignProofCardDesignProofFragment_artist | null;
}
