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
  slug: string | null;
  /**
   * Generates SEO and Social card meta tags to be used in your frontend
   */
  _seoMetaTags: BlogPostIndexPageSeoCategoryFragment__seoMetaTags[];
}
