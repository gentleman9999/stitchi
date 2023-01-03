/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PromotionalProductGlossaryTermGetDataQuery
// ====================================================

export interface PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_blocks_image_responsiveImage {
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

export interface PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_blocks_image {
  __typename: "FileField";
  id: any;
  responsiveImage: PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_blocks_image_responsiveImage | null;
}

export interface PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_blocks {
  __typename: "ImageRecord";
  id: any;
  image: PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_blocks_image | null;
}

export interface PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_links {
  __typename: "ArticleRecord";
  id: any;
  slug: string | null;
  title: string | null;
}

export interface PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description {
  __typename: "GlossaryEntryModelDescriptionField";
  value: any;
  blocks: PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_blocks[];
  links: PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_links[];
}

export interface PromotionalProductGlossaryTermGetDataQuery_glossaryEntry {
  __typename: "GlossaryEntryRecord";
  id: any;
  term: string | null;
  definition: string | null;
  slug: string | null;
  description: PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description | null;
}

export interface PromotionalProductGlossaryTermGetDataQuery {
  /**
   * Returns a specific record
   */
  glossaryEntry: PromotionalProductGlossaryTermGetDataQuery_glossaryEntry | null;
}

export interface PromotionalProductGlossaryTermGetDataQueryVariables {
  slug: string;
}
