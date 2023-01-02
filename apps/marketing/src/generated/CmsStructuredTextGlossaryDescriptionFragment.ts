/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CmsStructuredTextGlossaryDescriptionFragment
// ====================================================

export interface CmsStructuredTextGlossaryDescriptionFragment_blocks_image_responsiveImage {
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

export interface CmsStructuredTextGlossaryDescriptionFragment_blocks_image {
  __typename: "FileField";
  id: any;
  responsiveImage: CmsStructuredTextGlossaryDescriptionFragment_blocks_image_responsiveImage | null;
}

export interface CmsStructuredTextGlossaryDescriptionFragment_blocks {
  __typename: "ImageRecord";
  id: any;
  image: CmsStructuredTextGlossaryDescriptionFragment_blocks_image | null;
}

export interface CmsStructuredTextGlossaryDescriptionFragment_links {
  __typename: "ArticleRecord";
  id: any;
  slug: string | null;
  title: string | null;
}

export interface CmsStructuredTextGlossaryDescriptionFragment {
  __typename: "GlossaryEntryModelDescriptionField";
  value: any;
  blocks: CmsStructuredTextGlossaryDescriptionFragment_blocks[];
  links: CmsStructuredTextGlossaryDescriptionFragment_links[];
}
