/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignInventoryMatrixDesignProductFragment
// ====================================================

export interface DesignInventoryMatrixDesignProductFragment_sizes {
  __typename: "DesignProductSize";
  id: string;
  name: string;
}

export interface DesignInventoryMatrixDesignProductFragment_colors {
  __typename: "DesignProductColor";
  id: string;
  name: string | null;
  hex: string | null;
}

export interface DesignInventoryMatrixDesignProductFragment {
  __typename: "DesignProduct";
  id: string;
  sizes: DesignInventoryMatrixDesignProductFragment_sizes[] | null;
  colors: DesignInventoryMatrixDesignProductFragment_colors[];
}
