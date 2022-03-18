/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PageHeadingProductFragment
// ====================================================

export interface PageHeadingProductFragment_primaryImage {
  __typename: "ImageUrl";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface PageHeadingProductFragment {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  primaryImage: PageHeadingProductFragment_primaryImage | null;
}
