/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeoDefaultQuery
// ====================================================

export interface SeoDefaultQuery_homepage__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface SeoDefaultQuery_homepage {
  __typename: "HomepageRecord";
  /**
   * SEO meta tags
   */
  _seoMetaTags: SeoDefaultQuery_homepage__seoMetaTags[];
}

export interface SeoDefaultQuery {
  /**
   * Returns the single instance record
   */
  homepage: SeoDefaultQuery_homepage | null;
}
