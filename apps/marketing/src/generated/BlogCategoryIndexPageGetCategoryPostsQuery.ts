/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleModelFilter } from "./globalTypes";

// ====================================================
// GraphQL query operation: BlogCategoryIndexPageGetCategoryPostsQuery
// ====================================================

export interface BlogCategoryIndexPageGetCategoryPostsQuery__allArticlesMeta {
  __typename: "CollectionMetadata";
  count: any;
}

export interface BlogCategoryIndexPageGetCategoryPostsQuery {
  /**
   * Returns meta information regarding a record collection
   */
  _allArticlesMeta: BlogCategoryIndexPageGetCategoryPostsQuery__allArticlesMeta;
}

export interface BlogCategoryIndexPageGetCategoryPostsQueryVariables {
  filter?: ArticleModelFilter | null;
}
