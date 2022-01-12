/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SlugFilter } from "./globalTypes";

// ====================================================
// GraphQL query operation: BlogShowPageGetArticleQuery
// ====================================================

export interface BlogShowPageGetArticleQuery_article {
  __typename: "ArticleRecord";
  id: any;
}

export interface BlogShowPageGetArticleQuery {
  /**
   * Returns a specific record
   */
  article: BlogShowPageGetArticleQuery_article | null;
}

export interface BlogShowPageGetArticleQueryVariables {
  slug: SlugFilter;
}
