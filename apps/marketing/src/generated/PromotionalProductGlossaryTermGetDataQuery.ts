/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PromotionalProductGlossaryTermGetDataQuery
// ====================================================

export interface PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_primaryImage_responsiveImage {
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

export interface PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_primaryImage {
  __typename: "FileField";
  id: any;
  responsiveImage: PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_primaryImage_responsiveImage | null;
}

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

export interface PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_links_ArticleRecord {
  __typename: "ArticleRecord";
  id: any;
  slug: string | null;
  title: string | null;
}

export interface PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_links_GlossaryEntryRecord {
  __typename: "GlossaryEntryRecord";
  id: any;
  slug: string | null;
  term: string | null;
}

export type PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_links = PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_links_ArticleRecord | PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description_links_GlossaryEntryRecord;

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
  entryType: string | null;
  businessUrl: string | null;
  affiliateUrl: string | null;
  primaryImage: PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_primaryImage | null;
  description: PromotionalProductGlossaryTermGetDataQuery_glossaryEntry_description | null;
}

export interface PromotionalProductGlossaryTermGetDataQuery_relatedTerms {
  __typename: "GlossaryEntryRecord";
  id: any;
  term: string | null;
  slug: string | null;
  entryType: string | null;
}

export interface PromotionalProductGlossaryTermGetDataQuery {
  /**
   * Returns a specific record
   */
  glossaryEntry: PromotionalProductGlossaryTermGetDataQuery_glossaryEntry | null;
  /**
   * Returns a collection of records
   */
  relatedTerms: PromotionalProductGlossaryTermGetDataQuery_relatedTerms[];
}

export interface PromotionalProductGlossaryTermGetDataQueryVariables {
  slug: string;
}
