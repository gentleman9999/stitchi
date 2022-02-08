/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogCategoryIndexPageGetPagesQuery
// ====================================================

export interface BlogCategoryIndexPageGetPagesQuery_allCategories {
  __typename: "CategoryRecord";
  id: any;
  slug: string | null;
}

export interface BlogCategoryIndexPageGetPagesQuery__allArticlesMeta {
  __typename: "CollectionMetadata";
  count: any;
}

export interface BlogCategoryIndexPageGetPagesQuery {
  /**
   * Returns a collection of records
   */
  allCategories: BlogCategoryIndexPageGetPagesQuery_allCategories[];
  /**
   * Returns meta information regarding a record collection
   */
  _allArticlesMeta: BlogCategoryIndexPageGetPagesQuery__allArticlesMeta;
}
