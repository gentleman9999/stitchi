/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignProofDesignRequestFragment
// ====================================================

export interface DesignProofDesignRequestFragment_proofs_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
}

export interface DesignProofDesignRequestFragment_proofs_files_FileImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export type DesignProofDesignRequestFragment_proofs_files = DesignProofDesignRequestFragment_proofs_files_FileUnknown | DesignProofDesignRequestFragment_proofs_files_FileImage;

export interface DesignProofDesignRequestFragment_proofs_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignProofDesignRequestFragment_proofs {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  note: string | null;
  files: DesignProofDesignRequestFragment_proofs_files[];
  artist: DesignProofDesignRequestFragment_proofs_artist | null;
}

export interface DesignProofDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  proofs: DesignProofDesignRequestFragment_proofs[];
}
