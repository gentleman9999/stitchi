/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PromotionalProductsGlossaryCategoryGetDataQuery
// ====================================================

export interface PromotionalProductsGlossaryCategoryGetDataQuery_glossaryCategory_seoMetadata {
  __typename: "SeoField";
  title: string | null;
  description: string | null;
}

export interface PromotionalProductsGlossaryCategoryGetDataQuery_glossaryCategory__allReferencingGlossaryEntries_primaryImage_responsiveImage {
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

export interface PromotionalProductsGlossaryCategoryGetDataQuery_glossaryCategory__allReferencingGlossaryEntries_primaryImage {
  __typename: "FileField";
  id: any;
  responsiveImage: PromotionalProductsGlossaryCategoryGetDataQuery_glossaryCategory__allReferencingGlossaryEntries_primaryImage_responsiveImage | null;
}

export interface PromotionalProductsGlossaryCategoryGetDataQuery_glossaryCategory__allReferencingGlossaryEntries {
  __typename: "GlossaryEntryRecord";
  id: any;
  slug: string | null;
  entryType: string | null;
  definition: string | null;
  term: string | null;
  primaryImage: PromotionalProductsGlossaryCategoryGetDataQuery_glossaryCategory__allReferencingGlossaryEntries_primaryImage | null;
}

export interface PromotionalProductsGlossaryCategoryGetDataQuery_glossaryCategory {
  __typename: "GlossaryCategoryRecord";
  id: any;
  slug: string | null;
  title: string | null;
  seoMetadata: PromotionalProductsGlossaryCategoryGetDataQuery_glossaryCategory_seoMetadata | null;
  _allReferencingGlossaryEntries: PromotionalProductsGlossaryCategoryGetDataQuery_glossaryCategory__allReferencingGlossaryEntries[];
}

export interface PromotionalProductsGlossaryCategoryGetDataQuery {
  /**
   * Returns a specific record
   */
  glossaryCategory: PromotionalProductsGlossaryCategoryGetDataQuery_glossaryCategory | null;
}

export interface PromotionalProductsGlossaryCategoryGetDataQueryVariables {
  slug: string;
}
