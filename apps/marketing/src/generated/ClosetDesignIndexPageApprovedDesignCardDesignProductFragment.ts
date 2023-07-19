/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClosetDesignIndexPageApprovedDesignCardDesignProductFragment
// ====================================================

export interface ClosetDesignIndexPageApprovedDesignCardDesignProductFragment_colors {
  __typename: "DesignProductColor";
  hex: string | null;
  name: string | null;
}

export interface ClosetDesignIndexPageApprovedDesignCardDesignProductFragment_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ClosetDesignIndexPageApprovedDesignCardDesignProductFragment {
  __typename: "DesignProduct";
  id: string;
  name: string;
  minUnitPriceCents: number | null;
  colors: ClosetDesignIndexPageApprovedDesignCardDesignProductFragment_colors[];
  primaryImageFile: ClosetDesignIndexPageApprovedDesignCardDesignProductFragment_primaryImageFile | null;
}
