/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogPostIndexPageSeoPageFragment
// ====================================================

export interface BlogPostIndexPageSeoPageFragment__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface BlogPostIndexPageSeoPageFragment {
  __typename: "BlogIndexPageRecord";
  id: any;
  /**
   * SEO meta tags
   */
  _seoMetaTags: BlogPostIndexPageSeoPageFragment__seoMetaTags[];
}