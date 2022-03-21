/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductVariantsProductFragment
// ====================================================

export interface ProductVariantsProductFragment_variants_color {
  __typename: "Color";
  id: string;
  name: string | null;
  hex: string | null;
}

export interface ProductVariantsProductFragment_variants {
  __typename: "MaterialVariant";
  id: string;
  color: ProductVariantsProductFragment_variants_color | null;
}

export interface ProductVariantsProductFragment {
  __typename: "Material";
  id: string;
  variants: ProductVariantsProductFragment_variants[] | null;
}
