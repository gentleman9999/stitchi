/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CatalogProductProductFragment
// ====================================================

export interface CatalogProductProductFragment_primaryImage {
  __typename: "CatalogProductImage";
  url: string;
}

export interface CatalogProductProductFragment {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  primaryImage: CatalogProductProductFragment_primaryImage | null;
}
