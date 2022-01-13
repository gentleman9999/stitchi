/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SlugFilter } from "./globalTypes";

// ====================================================
// GraphQL query operation: BlogShowPageGetDataQuery
// ====================================================

export interface BlogShowPageGetDataQuery_article_content_blocks {
  __typename: "ArticleRecord";
  id: any;
}

export interface BlogShowPageGetDataQuery_article_content_links {
  __typename: "ArticleRecord";
  id: any;
  slug: string | null;
  title: string | null;
}

export interface BlogShowPageGetDataQuery_article_content {
  __typename: "ArticleModelContentField";
  value: any;
  blocks: BlogShowPageGetDataQuery_article_content_blocks[];
  links: BlogShowPageGetDataQuery_article_content_links[];
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
