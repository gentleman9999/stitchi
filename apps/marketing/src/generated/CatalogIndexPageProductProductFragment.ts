/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CatalogIndexPageProductProductFragment
// ====================================================

export interface CatalogIndexPageProductProductFragment_image {
  __typename: "Image";
  id: string;
  url: string;
}

export interface CatalogIndexPageProductProductFragment_manufacturer {
  __typename: "Manufacturer";
  name: string;
}

export interface CatalogIndexPageProductProductFragment_colors {
  __typename: "Color";
  id: string;
  hex: string | null;
}

export interface CatalogIndexPageProductProductFragment {
  __typename: "Material";
  id: string;
  name: string;
  variantCount: number;
  image: CatalogIndexPageProductProductFragment_image | null;
  manufacturer: CatalogIndexPageProductProductFragment_manufacturer | null;
  colors: CatalogIndexPageProductProductFragment_colors[] | null;
}
