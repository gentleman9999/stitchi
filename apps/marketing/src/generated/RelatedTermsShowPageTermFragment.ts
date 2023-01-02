/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RelatedTermsShowPageTermFragment
// ====================================================

export interface RelatedTermsShowPageTermFragment_description_blocks_image_responsiveImage {
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

export interface RelatedTermsShowPageTermFragment_description_blocks_image {
  __typename: "FileField";
  id: any;
  responsiveImage: RelatedTermsShowPageTermFragment_description_blocks_image_responsiveImage | null;
}

export interface RelatedTermsShowPageTermFragment_description_blocks {
  __typename: "ImageRecord";
  id: any;
  image: RelatedTermsShowPageTermFragment_description_blocks_image | null;
}

export interface RelatedTermsShowPageTermFragment_description_links {
  __typename: "ArticleRecord";
  id: any;
  slug: string | null;
  title: string | null;
}

export interface RelatedTermsShowPageTermFragment_description {
  __typename: "GlossaryEntryModelDescriptionField";
  value: any;
  blocks: RelatedTermsShowPageTermFragment_description_blocks[];
  links: RelatedTermsShowPageTermFragment_description_links[];
}

export interface RelatedTermsShowPageTermFragment {
  __typename: "GlossaryEntryRecord";
  id: any;
  term: string | null;
  slug: string | null;
  description: RelatedTermsShowPageTermFragment_description | null;
}
