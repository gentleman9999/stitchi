/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CatalogIndexPageProductGridProductFragment
// ====================================================

export interface CatalogIndexPageProductGridProductFragment_image {
  __typename: "Image";
  id: string;
  url: string;
}

export interface CatalogIndexPageProductGridProductFragment_manufacturer {
  __typename: "Manufacturer";
  name: string;
}

export interface CatalogIndexPageProductGridProductFragment_colors {
  __typename: "Color";
  id: string;
  hex: string | null;
}

export interface CatalogIndexPageProductGridProductFragment {
  __typename: "Material";
  id: string;
  name: string;
  variantCount: number;
  image: CatalogIndexPageProductGridProductFragment_image | null;
  manufacturer: CatalogIndexPageProductGridProductFragment_manufacturer | null;
  colors: CatalogIndexPageProductGridProductFragment_colors[] | null;
}
