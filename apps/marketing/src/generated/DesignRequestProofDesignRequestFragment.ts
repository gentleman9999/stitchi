/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignRequestProofDesignRequestFragment
// ====================================================

export interface DesignRequestProofDesignRequestFragment_proofs_artist {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface DesignRequestProofDesignRequestFragment_proofs {
  __typename: "DesignRequestProof";
  id: string;
  artistNote: string | null;
  createdAt: any;
  artist: DesignRequestProofDesignRequestFragment_proofs_artist | null;
}

export interface DesignRequestProofDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  proofs: DesignRequestProofDesignRequestFragment_proofs[];
}
