/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: IndustryTermCardTermFragment
// ====================================================

export interface IndustryTermCardTermFragment_primaryImage_responsiveImage {
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

export interface IndustryTermCardTermFragment_primaryImage {
  __typename: "FileField";
  id: any;
  responsiveImage: IndustryTermCardTermFragment_primaryImage_responsiveImage | null;
}

export interface IndustryTermCardTermFragment {
  __typename: "GlossaryEntryRecord";
  id: any;
  slug: string | null;
  entryType: string | null;
  definition: string | null;
  term: string | null;
  primaryImage: IndustryTermCardTermFragment_primaryImage | null;
}
