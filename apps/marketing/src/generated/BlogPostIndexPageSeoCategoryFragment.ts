/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogPostIndexPageSeoCategoryFragment
// ====================================================

export interface BlogPostIndexPageSeoCategoryFragment__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface BlogPostIndexPageSeoCategoryFragment {
  __typename: "CategoryRecord";
  id: any;
  /**
   * SEO meta tags
   */
  _seoMetaTags: BlogPostIndexPageSeoCategoryFragment__seoMetaTags[];
}
