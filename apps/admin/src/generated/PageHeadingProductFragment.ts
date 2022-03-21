/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PageHeadingProductFragment
// ====================================================

export interface PageHeadingProductFragment_image {
  __typename: "Image";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface PageHeadingProductFragment {
  __typename: "Material";
  id: string;
  name: string;
  image: PageHeadingProductFragment_image | null;
}
