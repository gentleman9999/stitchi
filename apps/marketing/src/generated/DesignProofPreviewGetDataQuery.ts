/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignProofPreviewGetDataQuery
// ====================================================

export interface DesignProofPreviewGetDataQuery_designProof_colors_images {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DesignProofPreviewGetDataQuery_designProof_colors {
  __typename: "DesignProofColor";
  id: string;
  catalogProductColorId: string;
  hexCode: string | null;
  name: string | null;
  images: DesignProofPreviewGetDataQuery_designProof_colors_images[];
}

export interface DesignProofPreviewGetDataQuery_designProof {
  __typename: "DesignProof";
  id: string;
  createdAt: any;
  colors: DesignProofPreviewGetDataQuery_designProof_colors[];
}

export interface DesignProofPreviewGetDataQuery {
  designProof: DesignProofPreviewGetDataQuery_designProof | null;
}

export interface DesignProofPreviewGetDataQueryVariables {
  designProofId: string;
}
