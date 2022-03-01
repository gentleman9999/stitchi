/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogPostShowPageSEOArticleFragment
// ====================================================

export interface BlogPostShowPageSEOArticleFragment__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface BlogPostShowPageSEOArticleFragment {
  __typename: "ArticleRecord";
  id: any;
  /**
   * SEO meta tags
   */
  _seoMetaTags: BlogPostShowPageSEOArticleFragment__seoMetaTags[];
}
