/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogPostIndexPageCategoryFragment
// ====================================================

export interface BlogPostIndexPageCategoryFragment_description {
  __typename: "CategoryModelDescriptionField";
  value: any;
}

export interface BlogPostIndexPageCategoryFragment__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface BlogPostIndexPageCategoryFragment {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  shortName: string | null;
  slug: string | null;
  description: BlogPostIndexPageCategoryFragment_description | null;
  /**
   * Generates SEO and Social card meta tags to be used in your frontend
   */
  _seoMetaTags: BlogPostIndexPageCategoryFragment__seoMetaTags[];
}
