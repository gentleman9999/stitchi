/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: IndustryTermsShowPageTermFragment
// ====================================================

export interface IndustryTermsShowPageTermFragment_description_blocks_image_responsiveImage {
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

export interface IndustryTermsShowPageTermFragment_description_blocks_image {
  __typename: "FileField";
  id: any;
  responsiveImage: IndustryTermsShowPageTermFragment_description_blocks_image_responsiveImage | null;
}

export interface IndustryTermsShowPageTermFragment_description_blocks {
  __typename: "ImageRecord";
  id: any;
  image: IndustryTermsShowPageTermFragment_description_blocks_image | null;
}

export interface IndustryTermsShowPageTermFragment_description_links {
  __typename: "ArticleRecord";
  id: any;
  slug: string | null;
  title: string | null;
}

export interface IndustryTermsShowPageTermFragment_description {
  __typename: "GlossaryEntryModelDescriptionField";
  value: any;
  blocks: IndustryTermsShowPageTermFragment_description_blocks[];
  links: IndustryTermsShowPageTermFragment_description_links[];
}

export interface IndustryTermsShowPageTermFragment {
  __typename: "GlossaryEntryRecord";
  id: any;
  term: string | null;
  slug: string | null;
  description: IndustryTermsShowPageTermFragment_description | null;
}
