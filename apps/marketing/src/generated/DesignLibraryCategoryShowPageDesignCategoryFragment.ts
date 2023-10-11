/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignLibraryCategoryShowPageDesignCategoryFragment
// ====================================================

export interface DesignLibraryCategoryShowPageDesignCategoryFragment__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface DesignLibraryCategoryShowPageDesignCategoryFragment__allReferencingDesigns_primaryImage_responsiveImage {
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

export interface DesignLibraryCategoryShowPageDesignCategoryFragment__allReferencingDesigns_primaryImage {
  __typename: "FileField";
  id: any;
  responsiveImage: DesignLibraryCategoryShowPageDesignCategoryFragment__allReferencingDesigns_primaryImage_responsiveImage | null;
}

export interface DesignLibraryCategoryShowPageDesignCategoryFragment__allReferencingDesigns {
  __typename: "DesignRecord";
  id: any;
  primaryImage: DesignLibraryCategoryShowPageDesignCategoryFragment__allReferencingDesigns_primaryImage | null;
}

export interface DesignLibraryCategoryShowPageDesignCategoryFragment {
  __typename: "DesignCategoryRecord";
  id: any;
  name: string | null;
  slug: string | null;
  /**
   * Generates SEO and Social card meta tags to be used in your frontend
   */
  _seoMetaTags: DesignLibraryCategoryShowPageDesignCategoryFragment__seoMetaTags[];
  _allReferencingDesigns: DesignLibraryCategoryShowPageDesignCategoryFragment__allReferencingDesigns[];
}
