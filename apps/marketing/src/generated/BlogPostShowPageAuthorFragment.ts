/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogPostShowPageAuthorFragment
// ====================================================

export interface BlogPostShowPageAuthorFragment_image_responsiveImage {
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

export interface BlogPostShowPageAuthorFragment_image {
  __typename: "FileField";
  id: any;
  responsiveImage: BlogPostShowPageAuthorFragment_image_responsiveImage | null;
}

export interface BlogPostShowPageAuthorFragment {
  __typename: "AuthorRecord";
  id: any;
  name: string | null;
  image: BlogPostShowPageAuthorFragment_image | null;
}
