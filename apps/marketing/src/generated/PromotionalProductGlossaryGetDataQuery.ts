/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PromotionalProductGlossaryGetDataQuery
// ====================================================

export interface PromotionalProductGlossaryGetDataQuery_allGlossaryCategories {
  __typename: "GlossaryCategoryRecord";
  id: any;
  title: string | null;
  slug: string | null;
}

export interface PromotionalProductGlossaryGetDataQuery_allGlossaryEntries_primaryImage_responsiveImage {
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

export interface PromotionalProductGlossaryGetDataQuery_allGlossaryEntries_primaryImage {
  __typename: "FileField";
  id: any;
  responsiveImage: PromotionalProductGlossaryGetDataQuery_allGlossaryEntries_primaryImage_responsiveImage | null;
}

export interface PromotionalProductGlossaryGetDataQuery_allGlossaryEntries {
  __typename: "GlossaryEntryRecord";
  id: any;
  slug: string | null;
  entryType: string | null;
  definition: string | null;
  term: string | null;
  primaryImage: PromotionalProductGlossaryGetDataQuery_allGlossaryEntries_primaryImage | null;
}

export interface PromotionalProductGlossaryGetDataQuery {
  /**
   * Returns a collection of records
   */
  allGlossaryCategories: PromotionalProductGlossaryGetDataQuery_allGlossaryCategories[];
  /**
   * Returns a collection of records
   */
  allGlossaryEntries: PromotionalProductGlossaryGetDataQuery_allGlossaryEntries[];
}
