/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CmsStructuredTextContentFragment
// ====================================================

export interface CmsStructuredTextContentFragment_blocks_image_responsiveImage {
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

export interface CmsStructuredTextContentFragment_blocks_image {
  __typename: "FileField";
  id: any;
  responsiveImage: CmsStructuredTextContentFragment_blocks_image_responsiveImage | null;
}

export interface CmsStructuredTextContentFragment_blocks {
  __typename: "ImageRecord";
  id: any;
  image: CmsStructuredTextContentFragment_blocks_image | null;
}

export interface CmsStructuredTextContentFragment_links_ArticleRecord {
  __typename: "ArticleRecord";
  id: any;
  slug: string | null;
  title: string | null;
  shortDescription: string | null;
}

export interface CmsStructuredTextContentFragment_links_GlossaryEntryRecord {
  __typename: "GlossaryEntryRecord";
  id: any;
  slug: string | null;
  term: string | null;
  entryType: string | null;
}

export interface CmsStructuredTextContentFragment_links_TableRecord {
  __typename: "TableRecord";
  id: any;
  table: any | null;
}

export type CmsStructuredTextContentFragment_links = CmsStructuredTextContentFragment_links_ArticleRecord | CmsStructuredTextContentFragment_links_GlossaryEntryRecord | CmsStructuredTextContentFragment_links_TableRecord;

export interface CmsStructuredTextContentFragment {
  __typename: "ArticleModelContentField";
  value: any;
  blocks: CmsStructuredTextContentFragment_blocks[];
  links: CmsStructuredTextContentFragment_links[];
}
