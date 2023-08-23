/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClosetDesignBuyPageFormDesignProductFragment
// ====================================================

export interface ClosetDesignBuyPageFormDesignProductFragment_colors {
  __typename: "DesignProductColor";
  id: string;
  hex: string | null;
  name: string | null;
  catalogProductColorId: string;
}

export interface ClosetDesignBuyPageFormDesignProductFragment_variants {
  __typename: "DesignProductVariant";
  id: string;
  sizeName: string | null;
  catalogProductSizeId: string | null;
  catalogProductColorId: string | null;
}

export interface ClosetDesignBuyPageFormDesignProductFragment {
  __typename: "DesignProduct";
  id: string;
  catalogProductId: string;
  colors: ClosetDesignBuyPageFormDesignProductFragment_colors[];
  variants: ClosetDesignBuyPageFormDesignProductFragment_variants[];
}
