/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogPostIndexPagePageFragment
// ====================================================

export interface BlogPostIndexPagePageFragment__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface BlogPostIndexPagePageFragment {
  __typename: "BlogIndexPageRecord";
  id: any;
  /**
   * Generates SEO and Social card meta tags to be used in your frontend
   */
  _seoMetaTags: BlogPostIndexPagePageFragment__seoMetaTags[];
}
