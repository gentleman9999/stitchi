/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: VariantQuantityMatrixFormDesignProductFragment
// ====================================================

export interface VariantQuantityMatrixFormDesignProductFragment_colors {
  __typename: "DesignProductColor";
  id: string;
  catalogProductColorId: string;
  hex: string | null;
  name: string | null;
}

export interface VariantQuantityMatrixFormDesignProductFragment_variants {
  __typename: "DesignProductVariant";
  id: string;
  sizeName: string | null;
  catalogProductSizeId: string | null;
  catalogProductColorId: string | null;
}

export interface VariantQuantityMatrixFormDesignProductFragment {
  __typename: "DesignProduct";
  id: string;
  colors: VariantQuantityMatrixFormDesignProductFragment_colors[];
  variants: VariantQuantityMatrixFormDesignProductFragment_variants[];
}
