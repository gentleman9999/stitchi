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
  slug: string | null;
  /**
   * Generates SEO and Social card meta tags to be used in your frontend
   */
  _seoMetaTags: BlogPostShowPageSEOArticleFragment__seoMetaTags[];
}
