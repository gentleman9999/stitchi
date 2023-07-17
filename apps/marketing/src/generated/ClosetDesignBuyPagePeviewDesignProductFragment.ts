/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClosetDesignBuyPagePeviewDesignProductFragment
// ====================================================

export interface ClosetDesignBuyPagePeviewDesignProductFragment_colors_images {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ClosetDesignBuyPagePeviewDesignProductFragment_colors {
  __typename: "DesignProductColor";
  id: string;
  catalogProductColorId: string;
  hex: string | null;
  name: string | null;
  images: ClosetDesignBuyPagePeviewDesignProductFragment_colors_images[];
}

export interface ClosetDesignBuyPagePeviewDesignProductFragment {
  __typename: "DesignProduct";
  id: string;
  name: string;
  description: string | null;
  colors: ClosetDesignBuyPagePeviewDesignProductFragment_colors[];
}
