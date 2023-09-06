/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignProofCardDesignProofFragment
// ====================================================

export interface DesignProofCardDesignProofFragment_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DesignProofCardDesignProofFragment_artist_user {
  __typename: "User";
  id: string;
  name: string | null;
}

export interface DesignProofCardDesignProofFragment_artist {
  __typename: "Membership";
  id: string;
  user: DesignProofCardDesignProofFragment_artist_user | null;
}

export interface DesignProofCardDesignProofFragment {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  primaryImageFile: DesignProofCardDesignProofFragment_primaryImageFile | null;
  artist: DesignProofCardDesignProofFragment_artist | null;
}
