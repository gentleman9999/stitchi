/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignProofDesignRequestFragment
// ====================================================

export interface DesignProofDesignRequestFragment_proofs_artist {
  __typename: 'User'
  id: string | null
  name: string | null
}

export interface DesignProofDesignRequestFragment_proofs {
  __typename: 'DesignProof'
  id: string
  artistNote: string | null
  createdAt: any
  artist: DesignProofDesignRequestFragment_proofs_artist | null
}

export interface DesignProofDesignRequestFragment {
  __typename: 'DesignRequest'
  id: string
  proofs: DesignProofDesignRequestFragment_proofs[]
}
