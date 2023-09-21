/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClosetInventoryIndexPageProductCardDesignProductFragment
// ====================================================

export interface ClosetInventoryIndexPageProductCardDesignProductFragment_colors {
  __typename: "DesignProductColor";
  hex: string | null;
  name: string | null;
}

export interface ClosetInventoryIndexPageProductCardDesignProductFragment_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ClosetInventoryIndexPageProductCardDesignProductFragment {
  __typename: "DesignProduct";
  id: string;
  name: string;
  minUnitPriceCents: number | null;
  colors: ClosetInventoryIndexPageProductCardDesignProductFragment_colors[];
  primaryImageFile: ClosetInventoryIndexPageProductCardDesignProductFragment_primaryImageFile | null;
}
