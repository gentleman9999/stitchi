/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SlugFilter } from "./globalTypes";

// ====================================================
// GraphQL query operation: BlogShowPageGetDataQuery
// ====================================================

export interface BlogShowPageGetDataQuery_article_content {
  __typename: "ArticleModelContentField";
  value: any;
}

export interface BlogShowPageGetDataQuery_article {
  __typename: "ArticleRecord";
  id: any;
  content: BlogShowPageGetDataQuery_article_content | null;
}

export interface BlogShowPageGetDataQuery {
  /**
   * Returns a specific record
   */
  article: BlogShowPageGetDataQuery_article | null;
}

export interface BlogShowPageGetDataQueryVariables {
  slug: SlugFilter;
}
