/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogShowPageGetPagesQuery
// ====================================================

export interface BlogShowPageGetPagesQuery_allArticles {
  __typename: "ArticleRecord";
  id: any;
  slug: string | null;
}

export interface BlogShowPageGetPagesQuery {
  /**
   * Returns a collection of records
   */
  allArticles: BlogShowPageGetPagesQuery_allArticles[];
}
