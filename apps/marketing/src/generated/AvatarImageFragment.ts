/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AvatarImageFragment
// ====================================================

export interface AvatarImageFragment_responsiveImage {
  __typename: "ResponsiveImage";
  srcSet: string;
  webpSrcSet: string;
  sizes: string;
  src: string;
  width: any;
  height: any;
  aspectRatio: any;
  alt: string | null;
  title: string | null;
  base64: string | null;
}

export interface AvatarImageFragment {
  __typename: "FileField";
  id: any;
  responsiveImage: AvatarImageFragment_responsiveImage | null;
}
